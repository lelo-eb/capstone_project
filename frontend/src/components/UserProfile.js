import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, email, profilePicture, bio } = userData;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {firstName} {lastName}</p>
      <p><strong>Email:</strong> {email}</p>
      {profilePicture && <img src={profilePicture} alt="Profile" />}
      {bio && <p><strong>Bio:</strong> {bio}</p>}
    </div>
  );
};

export default UserProfile;
