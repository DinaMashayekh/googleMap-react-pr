// LocationPermission.js
import React, { useState } from 'react';
import './LocationPermission.scss'; // Import the SCSS file

const LocationPermission = ({ onPermissionGranted }) => {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);

  const handlePermissionGranted = (granted) => {
    setShowPermissionPrompt(false);
    onPermissionGranted(granted);
  };

  return (
    showPermissionPrompt && (
      <div className="location-prompt">
        <h2>Location Permission</h2>
        <p>Do you want to allow this app to access your location?</p>
        <div className="button-container">
          <button onClick={() => handlePermissionGranted(true)}>Yes</button>
          <button onClick={() => handlePermissionGranted(false)}>No</button>
        </div>
      </div>
    )
  );
};

export default LocationPermission;
