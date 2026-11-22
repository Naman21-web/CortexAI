import {getAuth} from "firebase-admin/auth";
import {app} from "../config/firebase.js";
import User from "../models/user.model.js"; 
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const {token} = req.body;
    const decoded =  await getAuth(app).verifyIdToken(token);
    console.log(token, decoded);
    let user = await User.findOne({firebaseUid: decoded.uid});
    if (!user) {
        user = await User.create({
            firebaseUid: decoded.uid,
            name: decoded.name,
            email: decoded.email,
            avatar: decoded.picture
        });
    }
    console.log(user);
    const sessionId = crypto.randomUUID();
    await redis.set(`user-session-${user?._id}`,sessionId,"EX",7*24*60*60);
    await redis.set(`session-${sessionId}`, JSON.stringify({
      userId:user._id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
      plan: user.plan,
      credits: user.credits,
      totalCredits: user.totalCredits,
      planExpiredAt: user.planExpiresAt
    }), "EX", 60 * 60 * 24 * 7);

    res.cookie("session", sessionId, {httpOnly: true, secure: false,sameSite: "strict",maxAge: 1000 * 60 * 60 * 24 * 7});
    return res.status(200).json({ user });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req,res) => {
  try{
    const sessionId = req.cookies.session;
    if(!sessionId){
      return res.status(400).json({message:"No session found"});
    }
    await redis.del(`session-${sessionId}`);
    res.clearCookie("session");
    return res.status(200).json({message:"Logged out successfully"});
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateUserPayment = async (req,res) => {
  try {
    const {plan,credits,userId} = req.body;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User Not Found"});
    }
    user.plan = plan
    user.credits += credits
    user.totalCredits += credits
    user.planExpiresAt = new Date(Date.now() + 30*24*60*60*1000)
    await user.save();

    const sessionId = await redis.get(`user-session-${user._id}`);
    if (sessionId) {
      await redis.set(`session-${sessionId}`, JSON.stringify({
      userId:user._id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
      plan: user.plan,
      credits: user.credits,
      totalCredits: user.totalCredits,
      planExpiredAt: user.planExpiresAt
      }), "EX", 60 * 60 * 24 * 7);
    }

    return res.status(200).json({success: true,message: "Payment details updated successfully"})
  } catch (error) {
    return res.status(500).json({message:`Update user payment error ${error}`})
  }
}

export const deductCredits = async (req,res) => {
  try {

    const {userId,agent} = req.body;
    console.log("Request received to deduct credits. UserId: ",userId," agent: ",agent);
    const COST = {
      chat: 1,
      search: 5,
      coding: 10,
      pdf: 10,
      ppt: 10,
      vision: 10
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message: "User not found"});
    }
    console.log("Found User: ",user);

    const requiredCredits = COST[agent] ?? 1;
    if(user.credits < requiredCredits){
      res.status(400).json({message:"Not sufficient credits"});
    }
    user.credits -= requiredCredits;
    await user.save(); 

    console.log("Deducted User Credits ",user);
    const sessionId = await redis.get(`user-session-${user._id}`);
    if (sessionId) {
      await redis.set(`session-${sessionId}`, JSON.stringify({
        userId:user._id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiredAt: user.planExpiresAt
      }), "EX", 60 * 60 * 24 * 7);
    }
    else{
      console.log("Session not found in db")
    }
    console.log("Credits deducted successfully ")
    return res.status(200).json({success: true, credits: user.credits})
  } catch (err) {
    return res.status(500).json({message:`Deduct Credits Error ${err}`});
  }
}