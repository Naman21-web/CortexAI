import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async(req,res) => {
    try{
        const userId = req.headers['x-user-id'];
        console.log("userId",userId);
        const conversation = new Conversation({
            userId:userId
        });
        await conversation.save();
        res.status(201).json(conversation);

    }
    catch(error){
        console.error("Error creating conversation:", error);
        res.status(500).json({ message: "Error creating conversation" });
    }
}

export const getConversations = async(req,res) => {
    try{
        const userId = req.headers['x-user-id'];
        console.log("userId",userId);
        const conversations = await Conversation.find({ userId: userId }).sort({updatedAt: -1});
        res.status(200).json(conversations);
    }
    catch(error){
        console.error("Error fetching conversations:", error);
        res.status(500).json({ message: "Error fetching conversations" });
    }
}

export const updateConversation = async(req,res) => {
    try{
        const {conversationId,title} = req.body;
        const updatedConversation = await Conversation.findByIdAndUpdate(conversationId, { title });
        res.status(200).json(updatedConversation);
    }
    catch(error){
        console.error("Error updating conversation:", error);
        res.status(500).json({ message: "Error updating conversation" });
    }
}

export const saveMessage = async(req,res) => {
    try{
        const {conversationId, message,role} = req.body;
        // const role = req.headers['x-user-id'] ? "user" : "assistant";
        const newMessage = new Message({
            conversationId,
            role,
            content: message
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error){
        console.error("Error saving message:", error);
        res.status(500).json({ message: "Error saving message" });
    }
}

export const getMessages = async(req,res) => {
    try{
        const {conversationId} = req.params;
        const messages = await Message.find({ conversationId: conversationId }).sort({createdAt: 1});
        res.status(200).json(messages);
    }
    catch(error){
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Error fetching messages" });
    }
}