import React from 'react';
import Home from './pages/Home';
import { useEffect } from 'react';
import getCurrentUser from './features/getCurrentUser';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';

const App = () => {
  const dispatch = useDispatch();
  console.log("App Loaded");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      dispatch(setUserData(user));
    };
    fetchUser();
  }, []);
  return (
    <>
      <Home />
    </>
  )
}

export default App
