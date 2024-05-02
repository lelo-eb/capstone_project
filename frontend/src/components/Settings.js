import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [userSettings, setUserSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user settings from the backend
    const fetchSettings = async () => {
      try {
        const response = await fetch('/user/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch user settings');
        }
        const data = await response.json();
        setUserSettings(data.settings);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings">
      <h2>Settings</h2>
      <ul>
        <li>Username: {userSettings.username}</li>
        <li>Email: {userSettings.email}</li>
        <li>Profile Picture: <img src={userSettings.profilePicture} alt="Profile" /></li>
        {/* Render other user settings */}
      </ul>
    </div>
  );
};

export default Settings;
