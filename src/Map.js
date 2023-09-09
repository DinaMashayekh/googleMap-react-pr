
// Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ location, showMarker, markerPositions }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const mapOptions = {
    zoom: 15,
    center: center,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBQrwSchs7js3RbVT_0Fra5Bv-DdYR0BiQ"> {/* Replace with your actual API key */}
      <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions}>
        { markerPositions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
