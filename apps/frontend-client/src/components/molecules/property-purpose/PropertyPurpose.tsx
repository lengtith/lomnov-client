import React, { useState, useImperativeHandle, forwardRef } from "react";

const PropertyPurpose = forwardRef((props: any, ref) => {
  const [selected, setSelected] = useState<string | null>(null); // Track the selected value
  const [error, setError] = useState<string>(""); // Track error message

  // Handle radio button change
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    setError(""); // Clear the error when an option is selected
  };

  // Validation function
  const validateSelection = () => {
    if (!selected) {
      setError("Please select a property purpose (Sale, Rent, or Both)!!");
      return false;
    } else {
      console.log("Selected purpose:", selected);
      return true;
    }
  };

  // Expose the `validateSelection` method to the parent via `ref`
  useImperativeHandle(ref, () => ({
    validateSelection,
    getSelected: () => selected,
  }));

  return (
    <div>
      <div className="flex items-center space-x-3 mb-5">
        <svg
          className="w-4 h-4 text-gray-800 dark:text-red-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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

        <span className="text-lg font-bold text-gray-900">Property For</span>
      </div>

      <div className="flex justify-center items-center font-medium mt-5 space-x-32">
        <div>
          <input
            type="radio"
            id="sale"
            name="propertyPurpose"
            value="Sale"
            checked={selected === "Sale"}
            onChange={handleRadioChange}
            className="pe-1"
          />
          <label htmlFor="Sale" className="ps-2">
            Sale
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="rent"
            name="propertyPurpose"
            value="Rent"
            checked={selected === "Rent"}
            onChange={handleRadioChange}
            // className="hidden"
          />
          <label htmlFor="Rent" className="ps-2">
            Rent
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="both"
            name="propertyPurpose"
            value="Both"
            checked={selected === "Both"}
            onChange={handleRadioChange}
            // className="hidden"
          />
          <label htmlFor="Both" className="ps-2">
            Both
          </label>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-red-500 text-sm flex justify-center">{error}</p>
      )}
    </div>
  );
});

PropertyPurpose.displayName = "PropertyPurpose"; // Required for forwardRef components
export default PropertyPurpose;
