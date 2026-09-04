import React from 'react';
import Home from './pages/Home';
import { useEffect } from 'react';
import getCurrentUser from './features/getCurrentUser';

const App = () => {
  console.log("App Loaded");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      console.log(user);
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
