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
      const data = await getCurrentUser();
      dispatch(setUserData(data.user));
      console.log("User inside App: ",data);
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
