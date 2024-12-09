import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import LocationPost from "@/components/molecules/location-post/LocationPost";
import axios from "axios";
import Map from "@/components/molecules/map/Map";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

interface Option {
  name: string;
}

// Fetch property function
async function fetchProperty(id: string): Promise<RealEstateItem | null> {
  try {
    const res = await axios.get(
      `https://lomnov.onrender.com/api/v1/properties?id=${id}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch property data");
    }
    const data = await res.data;
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

const LocationProperty = forwardRef((props, ref) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [sangkat, setSangkat] = useState("");
  const [khom, setKhom] = useState("");
  const [village, setVillage] = useState("");
  const [street, setStreet] = useState("");
  const [property, setProperty] = useState<RealEstateItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for input fields
  const locationPostRef = useRef<any>(null);
  const sangkatRef = useRef<HTMLInputElement>(null);
  const khomRef = useRef<HTMLInputElement>(null);
  const villageRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  // Handle location change from LocationPost
  const handleLocationChange = (selectedOption: Option) => {
    setSelectedLocation(selectedOption.name);
    setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
  };

  // Fetch property data
  useEffect(() => {
    const loadProperty = async () => {
      const fetchedProperty = await fetchProperty("1");
      setProperty(fetchedProperty);
    };

    loadProperty();
  }, []);

  // Validation function
  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate LocationPost component
    if (locationPostRef.current) {
      const isLocationValid = locationPostRef.current.validate();
      if (!isLocationValid) {
        newErrors.location = "City/Province is required.";
        isValid = false;
      }
    }

    // Validate other fields
    if (!sangkat.trim()) {
      newErrors.sangkat = "Sangkat/Commune is required.";
      isValid = false;
    }
    if (!khom.trim()) {
      newErrors.khom = "Khom/District is required.";
      isValid = false;
    }
    if (!village.trim()) {
      newErrors.village = "Village is required.";
      isValid = false;
    }
    if (!street.trim()) {
      newErrors.street = "Street number is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid };
  };

  // Focus the next field when Enter key is pressed
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // Expose validate and data via ref
  useImperativeHandle(ref, () => ({
    validate,
    getData: () => ({
      sangkat,
      khom,
      village,
      street,
    }),
  }));

  return (
    <div>
      <div className="mt-10 flex items-center space-x-3">
        <svg
          className="w-4 h-4 text-gray-800 dark:text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
          />
        </svg>
        <span className="text-lg font-bold text-gray-900">Location</span>
      </div>
      <div className="mt-5 ms-10">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="font-medium">
              City/Province: <span className="text-red-500">*</span>
            </label>
            <LocationPost
              ref={locationPostRef}
              onChange={handleLocationChange}
            />

            <label className="font-medium">
              SangKat/Commune: <span className="text-red-500">*</span>
            </label>
            <input
              ref={sangkatRef}
              type="text"
              value={sangkat}
              onChange={(e) => {
                setSangkat(e.target.value);
                // Remove error message when user starts typing
                if (errors.sangkat) {
                  setErrors((prevErrors) => ({ ...prevErrors, sangkat: "" }));
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, khomRef)} // Move to the next field
              className={`border-[2px] rounded-lg w-[97%] px-5 py-3 mt-2 ${
                errors.sangkat ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Enter the SangKat/Commune"
            />
            {errors.sangkat && (
              <p className="text-red-400 text-sm mt-1">{errors.sangkat}</p>
            )}

            <label className="font-medium">
              Khom/District: <span className="text-red-500">*</span>
            </label>
            <input
              ref={khomRef}
              type="text"
              value={khom}
              onChange={(e) => {
                setKhom(e.target.value);
                // Remove error message when user starts typing
                if (errors.khom) {
                  setErrors((prevErrors) => ({ ...prevErrors, khom: "" }));
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, villageRef)} // Move to the next field
              className={`border-[2px] rounded-lg w-[97%] px-5 py-3 mt-2 ${
                errors.khom ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Enter the Khom/District"
            />
            {errors.khom && (
              <p className="text-red-400 text-sm mt-1">{errors.khom}</p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Village: <span className="text-red-500">*</span>
            </label>
            <input
              ref={villageRef}
              type="text"
              value={village}
              onChange={(e) => {
                setVillage(e.target.value);
                // Remove error message when user starts typing
                if (errors.village) {
                  setErrors((prevErrors) => ({ ...prevErrors, village: "" }));
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, streetRef)} // Move to the next field
              className={`border-[2px] rounded-lg w-[97%] px-5 py-3 mt-2 ${
                errors.village ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Enter the Village"
            />
            {errors.village && (
              <p className="text-red-400 text-sm mt-1">{errors.village}</p>
            )}

            <label className="font-medium">
              Street number: <span className="text-red-500">*</span>
            </label>
            <input
              ref={streetRef}
              type="text"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                // Remove error message when user starts typing
                if (errors.street) {
                  setErrors((prevErrors) => ({ ...prevErrors, street: "" }));
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, streetRef)} // Keep focus on the last field
              className={`border-[2px] rounded-lg w-[97%] px-5 py-3 mt-2 ${
                errors.street ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Enter the Street number"
            />
            {errors.street && (
              <p className="text-red-400 text-sm mt-1">{errors.street}</p>
            )}
          </div>
        </div>

        {/* Map */}
        <label className="font-medium mb-5">
          Location on Map: <span className="text-red-500">*</span>
        </label>
        {property ? (
          property.urlmap ? (
            <div className="w-full h-full mt-10">
              <Map property={property.urlmap} />
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Map URL not available for this property.
            </p>
          )
        ) : (
          <p className="text-center text-gray-600">
            Loading map or property data...
          </p>
        )}
      </div>
    </div>
  );
});

LocationProperty.displayName = "LocationProperty"; // Required for forwardRef
export default LocationProperty;
