"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";

interface Option {
  name: string;
}

interface PropertyPostProps {
  onChange: (option: Option) => void;
}

const properties = [
  { name: "House" },
  { name: "Land" },
  { name: "Villa" },
  { name: "Shop" },
];

const PropertyPost = forwardRef((props: PropertyPostProps, ref) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selected = properties.find((option) => option.name === selectedName);
    if (selected) {
      setSelectedOption(selected);
      setError(null); // Clear the error if a valid option is selected
      props.onChange(selected); // Trigger the parent's onChange handler
    }
  };

  // Expose validate method via ref
  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!selectedOption) {
        setError("Please select a property type.");
        return false;
      }
      return true;
    },
    getSelectedOption: () => selectedOption,

    reset() {
      setSelectedOption(null);
    },
  }));

  return (
    <div>
      <select
        name="propertyType"
        id="propertyType"
        className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 mb-4 cursor-pointer ${
          error ? "border-red-400" : "border-gray-400"
        }`}
        value={selectedOption?.name || ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
          Select a property type
        </option>
        {properties.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
});

PropertyPost.displayName = "PropertyPost"; // Required for forwardRef

export default PropertyPost;
