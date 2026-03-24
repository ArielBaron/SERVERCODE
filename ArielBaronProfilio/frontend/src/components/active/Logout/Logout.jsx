import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext'; // Adjust path as needed

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser(); // Use the logout function from context

  const handleLogout = () => {
    // Clear token and update user context
    logout(); // This will clear localStorage and set user to null
    
    // Redirect to home or login page
    navigate('/home');
  };

  return (
    <div>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}