import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './../utils/firebase.js';
import api from '../utils/axios.js';


const handleLogin = async (token) => {
  try{
    const {data} = await api.post("/auth/login",token);
    console.log(data);
  }
  catch(error){
    console.log(error);
  }
}

const googleLogin = async () => {
  const data = await signInWithPopup(auth, googleProvider);
  const token = await data.user.getIdToken();
  console.log(token);
  await handleLogin(token);
}

const App = () => {
  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
      <button onClick={googleLogin}  className='w-50 h-24 bg-white'>
        Continue with google
      </button>
    </div>
  )
}

export default App
