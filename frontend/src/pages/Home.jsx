import React, { useRef, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './../../utils/firebase.js';
import api from '../../utils/axios.js';
import {FcGoogle} from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import Sidebar from '../components/sidebar.jsx';
import ChatArea from '../components/chatArea.jsx';
import Artifact from '../components/artifact.jsx';


function Home() {

    const {userData} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const loginInProgress = useRef(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    console.log("UserData: ",userData);

    const googleLogin = async () => {
        if (loginInProgress.current) return;

        loginInProgress.current = true;
        setIsLoggingIn(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("AuthProvider Res: ",result)
            const token = await result.user.getIdToken();
            console.log("AuthProvider Token: ",token);
            const {data} = await api.post("/api/auth/login", {token});
            console.log("Backend Data Res: ",data);
            dispatch(setUserData(data.user));
        } catch (error) {
            console.error("Google login failed:", {
                code: error.code,
                message: error.message,
                status: error.response?.status,
            });
            if (error.code === "auth/cancelled-popup-request") {
                alert("A Google sign-in request is already in progress. Finish or close the existing sign-in window, then try again.");
            } else {
                alert(error.response
                    ? "Google sign-in succeeded, but the app could not create your session. Check the backend logs."
                    : `Google login failed${error.code ? ` (${error.code})` : ""}. Please try again.`);
            }
        } finally {
            loginInProgress.current = false;
            setIsLoggingIn(false);
        }
    };
    
  return (
    <div className='h-screen flex bg-[#0d0f14] text-white  overflow-hidden'>

        <Sidebar />
        <ChatArea />
        <Artifact />


        {!userData && 
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                    <div>
                        <h2 className='text-[17px] font-semibold text-slate-100 tracking tight'>Welcome to CortexAI</h2>
                        <p className='text-[13px] text-slate-500'>Please login to continue using app</p>
                    </div>
                    <button disabled={isLoggingIn} aria-busy={isLoggingIn} className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 disabled:opacity-60 disabled:cursor-wait transition-all duration-150 cursor-pointer' onClick={googleLogin}>
                        <FcGoogle size={15}/>
                        {isLoggingIn ? "Connecting to Google..." : "Continue with Google"}
                    </button>
                </div>  
            </div>
        }
    </div>
  )
}

export default Home;