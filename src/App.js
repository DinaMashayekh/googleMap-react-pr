import React, { useState, useEffect } from 'react';
import LocationPermission from './LocationPermission';
import Map from './Map';
import './App.scss';
import ConfigForm from './ConfigForm'; // Import the ConfigForm component

const App = () => {
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [showMarker, setShowMarker] = useState(false); // State to control the visibility of the marker
  const [numMarkers, setNumMarkers] = useState(0); // State to store the number of markers
  const [markerPositions, setMarkerPositions] = useState([]);
  const [updateInterval, setUpdateInterval] = useState(1000); // State to store the update interval

  useEffect(() => {
    // Function to update markers randomly
    const updateMarkers = () => {
      if (showMarker) {
        // Generate random marker positions based on the selected number of markers
        const newMarkerPositions = generateRandomMarkerPositions(numMarkers);

        // Update marker positions
        setMarkerPositions(newMarkerPositions);
      }
    };

    // Set up the interval to update markers
    const intervalId = setInterval(updateMarkers, localStorage.getItem('time'));

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [showMarker, numMarkers, updateInterval]);

  const handleLocationPermission = (granted) => {
    if (granted) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationPermissionGranted(true);
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      setLocationPermissionGranted(false);
    }
  };

  const handleEditConfiguration = () => {
    setShowConfigForm(true);
  };

  const handleConfigFormClose = () => {
    setShowConfigForm(false);
  };

  const handleConfigFormSave = (config) => {
    // Handle saving the configuration data
    console.log('Configuration saved:', config);

    // Update the update interval based on the selected value
    setUpdateInterval(config.updateInterval);

    // Generate random marker positions based on the selected number of markers
    const newMarkerPositions = generateRandomMarkerPositions(config.numMarkers);
    setNumMarkers(config.numMarkers);

    // Update marker positions
    setMarkerPositions(newMarkerPositions);
    setShowMarker(true);
  };

  const generateRandomMarkerPositions = (numMarkers) => {
    const positions = [];
    const bounds = 0.1; // Adjust this value to control the spread of markers

    for (let i = 0; i < numMarkers; i++) {
      const lat = location.latitude + (Math.random() * bounds * 2 - bounds);
      const lng = location.longitude + (Math.random() * bounds * 2 - bounds);
      positions.push({ lat, lng });
    }

    return positions;
  };

  return (
    <div className="App">
      {locationPermissionGranted ? (
        <>
          <header className="header">
            <div>
              <button className="button" onClick={handleEditConfiguration}>
                Edit Configuration
              </button>
            </div>
          </header>
          <main className={`main ${showConfigForm ? 'blur' : ''}`}>
            {location ? (
              <Map location={location} showMarker={showMarker} markerPositions={markerPositions} />
            ) : null}
          </main>
          {showConfigForm && (
            <ConfigForm onClose={handleConfigFormClose} onSave={handleConfigFormSave} />
          )}
        </>
      ) : (
        <LocationPermission onPermissionGranted={handleLocationPermission} />
      )}
    </div>
  );
};

export default App;
