// components/LogoutHandler/LogoutHandler.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {


    
    setIsLoggedIn(null); 
    localStorage.removeItem('tables');
    navigate('/');
    
  }, [setIsLoggedIn, navigate]); // Dependencies for useEffect

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logging out...</h2>
      <p>Please wait, you are being redirected.</p>
    </div>
  );
};

export default Logout;