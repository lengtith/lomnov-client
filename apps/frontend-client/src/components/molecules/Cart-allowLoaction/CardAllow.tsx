
"use client";
import { useEffect, useState } from "react";
import ItemCartNearlyList from "../item-nearly-location/ItemListNearly";

// Interface for coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

//this is functuon card location near user
const CartAllowLocation: React.FC = () => {
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [navigator, setNavigator] = useState<any>(null)

  const handleAllowLocation = () => {
    if (navigator && navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position: any) => {
          setLocationAllowed(true);
          setCoordinates({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        () => {
          setLocationAllowed(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocationAllowed(false);
    }
    setShowPopup(false);
  };

  const handleDenyLocation = () => {
    setLocationAllowed(false);
    setShowPopup(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 50000); // Auto-hide popup after 10 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=" p-6 font-sans">
      {/* Location Pop-up */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="bg-white z-20 w-[400px]  rounded-lg shadow-lg p-6  max-w-md transform transition duration-300 scale-100">
            <p className="text-olive-drab mb-6 text-2xl">
              Please allow location to find nearly properties.
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={handleAllowLocation}
                className="bg-olive-drab text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Allow
              </button>
              <button
                onClick={handleDenyLocation}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Based on Location Access */}
      {locationAllowed === null && (
        <p className="text-gray-600">
          Please allow location access to view nearby properties and the map.
        </p>
      )}

      {locationAllowed === true && coordinates && (
        <div className="mt-[80px]">
          {/* Display Property List */}
          <div className="w-full lg:w-[1300px] m-auto px-2 lg:px-0">
            <ItemCartNearlyList />
          </div>

          {/* Display Map */}


        </div>
      )}

      {locationAllowed === false && (
        <div className="mt-10 text-red-600 text-center">
          <p>Location access denied. Properties Cannot found!</p>
        </div>
      )}
    </div>
  );
};

export default CartAllowLocation;
