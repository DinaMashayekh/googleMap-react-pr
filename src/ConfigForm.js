// ConfigForm.js
import React, { useState } from 'react';
import './ConfigForm.scss';
const ConfigForm = ({ onClose, onSave }) => {
  const [numMarkers, setNumMarkers] = useState(500);
  const [time, setTime] = useState(1000);


  const markerOptions = [];
  for (let i = 500; i <= 10000; i += 500) {
    markerOptions.push(i);
  }
  const handleSave = () => {
    localStorage.setItem('numMarkers', numMarkers.toString());
    localStorage.setItem('time', time.toString());
 onSave({ numMarkers, time });
    onClose(); // Close the form
  };

  return (
    <div className="config-form">
      <div className="form-container">
        <h2>Edit Configuration</h2>
        <div className="form-group">
          <label htmlFor="numMarkers">Number of Markers:</label>
          <select
            id="numMarkers"
            value={numMarkers}
            onChange={(e) => setNumMarkers(parseInt(e.target.value))}
          >
            {markerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
          >
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
            <option value={3000}>3000</option>
            <option value={4000}>4000</option>
            <option value={5000}>5000</option>
          </select>
        </div>
        <button onClick={handleSave}>Start</button>
      </div>
    </div>
  );
};

export default ConfigForm;
