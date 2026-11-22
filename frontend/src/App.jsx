import React from 'react';
import Home from './pages/Home';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../utils/firebase';
import api from '../utils/axios';
import getCurrentUser from './features/getCurrentUser';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';

const App = () => {
  const dispatch = useDispatch();
  console.log("App Loaded");
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const result = await getRedirectResult(auth);
        console.log("Redirect Result: ",result)
        const firebaseUser = result?.user ?? auth.currentUser;

        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          const { data } = await api.post("/api/auth/login", { token });
          dispatch(setUserData(data.user));
          return;
        }

        console.info("No Firebase redirect sign-in was found; checking the backend session.");
        const data = await getCurrentUser();
        dispatch(setUserData(data?.user ?? null));
      } catch (error) {
        console.error("User initialization failed:", {
          code: error.code,
          message: error.message,
          status: error.response?.status,
        });
        dispatch(setUserData(null));
      }
    };

    initializeUser();
  }, [dispatch]);
  return (
    <>
      <Home />
    </>
  )
}

export default App
