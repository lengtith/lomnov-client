"use client"; // Ensure this is a client component

import { get } from 'http';
import React, { useEffect, useState } from 'react';

const LocationAccess: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkLocationPermission = async () => {
      if (!navigator.permissions) {
        // If permissions API is not supported, directly get the location
        getLocation();
        return;
      }

      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        if (permissionStatus.state === 'granted') {
          // If permission is granted, get the location
          getLocation();
        } else if (permissionStatus.state === 'denied') {
          // If permission is denied, handle it
          setError('Location access is blocked. Please allow location access in your browser settings.');
        } else {
          // If permission is still in a prompt state, request location
          getLocation();
        }
      } catch (err) {
        console.error('Error checking permission:', err);
        getLocation(); // Attempt to get location regardless
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
          setLoading(false);
        },
        (err) => {
          switch (err.code) {
            case 1: // PERMISSION_DENIED
              setError('User denied the request for Geolocation.');
              break;
            case 2: // POSITION_UNAVAILABLE
              setError('Location information is unavailable.');
              break;
            case 3: // TIMEOUT
              setError('The request to get user location timed out.');
              break;
            case 0: // UNKNOWN_ERROR
              setError('An unknown error occurred.');
              break;
            default:
              setError('An error occurred while retrieving location.');
          }
          setLoading(false);
        }
      );
    };

    checkLocationPermission();
  }, []);

  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location && !loading && !error && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default LocationAccess;
