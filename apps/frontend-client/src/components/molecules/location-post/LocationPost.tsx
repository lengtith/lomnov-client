"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";

interface Option {
  name: string;
}

interface LocationPostProps {
  onChange: (option: Option) => void;
}

const locations = [
  { name: "Banteay Meanchey" },
  { name: "Battambang" },
  { name: "Kampong Cham" },
  { name: "Kampong Chhang" },
  { name: "Kampong Speu" },
  { name: "Kampong Thom" },
  { name: "Kampot" },
  { name: "Kandal" },
  { name: "Kep" },
  { name: "Koh Kong" },
  { name: "Kratié" },
  { name: "Mondulkiri" },
  { name: "Oddar Meanchey" },
  { name: "Pailin" },
  { name: "Phnom Penh" },
  { name: "Preah Sihanouk" },
  { name: "Preah Vihear" },
  { name: "Prey Veng" },
  { name: "Pursat" },
  { name: "Siem Reap" },
  { name: "Stung Treng" },
  { name: "Svay Rieng" },
  { name: "Takéo" },
  { name: "Tboung Khmum" },
];

const LocationPost = forwardRef((props: LocationPostProps, ref) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [error, setError] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selected = locations.find((option) => option.name === selectedName);
    if (selected) {
      setSelectedOption(selected);
      setError(""); // Clear error
      props.onChange(selected); // Notify parent
    }
  };

  // Validation method
  const validate = () => {
    if (!selectedOption) {
      setError("Please select a location.");
      return false;
    }
    return true;
  };

  // Expose validate and selected data via ref
  useImperativeHandle(ref, () => ({
    validate,
    getSelectedOption: () => selectedOption,
  }));

  return (
    <div>
      <select
        id="location"
        className={`border-[2px] rounded-lg px-5 py-3 mt-2  w-[97%] cursor-pointer ${
          error ? "border-red-400 " : "border-gray-400"
        }`}
        value={selectedOption?.name || ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
          Select a location
        </option>
        {locations.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
});

LocationPost.displayName = "LocationPost";

export default LocationPost;
