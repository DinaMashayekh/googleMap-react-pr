
// Map.js
import React, { useLayoutEffect,useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, isEditing } from '@react-google-maps/api';

const Map = ({ location, showMarker, markerPositions }) => {
    const [isEditing, setIsEditing] = useState(false); // Add this line

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };
   // Define a small random offset (adjust the values as needed)
   const randomOffset = 0.5;

   // Modify each marker position by adding a random offset
   const spreadOutMarkerPositions = markerPositions.map((position) => ({
     lat: position.lat + (Math.random() * 2 - 1) * randomOffset,
     lng: position.lng + (Math.random() * 2 - 1) * randomOffset,
   }));

  const bounds = calculateBounds(spreadOutMarkerPositions);

  const mapOptions = {
    zoom: 15,
    center: center,
    restriction: {
        latLngBounds: calculateBounds(markerPositions),
    },
  };

  const mapRef = useRef(null);
  const [initialZoomed, setInitialZoomed] = useState(false);

  useLayoutEffect(() => {
    if (mapRef.current && markerPositions.length > 0 && !isEditing) { // Check if isEditing is false
        const bounds = calculateBounds(markerPositions);
      mapRef.current.fitBounds(bounds);
      setInitialZoomed(true); // Mark the map as initially zoomed
    }
  }, [markerPositions]);

  useEffect(() => {
    if (mapRef.current && spreadOutMarkerPositions.length > 0 && !isEditing) { // Check if isEditing is false
        const bounds = calculateBounds(spreadOutMarkerPositions);
      mapRef.current.fitBounds(bounds);
    }
}, [markerPositions, isEditing]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBQrwSchs7js3RbVT_0Fra5Bv-DdYR0BiQ"> {/* Replace with your actual API key */}
      <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} onLoad={(map) => (mapRef.current = map)}>

      <Marker position={center} />

        { markerPositions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const calculateBounds = (positions) => {
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds();
      positions.forEach((position) => {
        bounds.extend(position);
      });
      return bounds;
    }
    // Fallback bounds if google.maps is not available
    return {
      getNorthEast: () => ({ lat: 0, lng: 0 }),
      getSouthWest: () => ({ lat: 0, lng: 0 }),
    };
  };
  

  
  
  
export default Map;
