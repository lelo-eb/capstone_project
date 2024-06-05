// src/components/Logout.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const Logout = () => {
  const { setIsLoggedIn, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Update the state to reflect the user is logged out
    setCurrentUser(null);
    setIsLoggedIn(false);

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
