"use client";

import React, { useState, useRef } from "react";
import PropertyPost from "@/components/molecules/property-post/PropertyPost";
import InformationProperty from "@/components/molecules/information-property/InformationProperty";
import LocationProperty from "@/components/molecules/location-property/LocationProperty";
import PropertyPurpose from "@/components/molecules/property-purpose/PropertyPurpose";

function Page() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for the popup
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false);
  const [titleData, setTitleData] = useState("");
  const [descriptpData, setDescriptionData] = useState("");
  const [propertyPurposeData, setPropertyPurposeData] = useState("");
  const [showPopupErrorCreate, setShowPopupErrorCreate] =
    useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const infoRef = useRef<any>(null); // Ref for the InformationProperty component
  const propertyPurposeRef = useRef<any>(null); // Ref for the PropertyPurpose component
  const locationRef = useRef<any>(null); // Ref for the LocationProperty component
  const propertyPostRef = useRef<any>(null); // Ref for PropertyPost

  // References to input fields
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  // catch Data

  const SendMessage = (FormData: any) => {
    setTitleData(FormData.get("titleData"));
    setDescriptionData(FormData.get("discriptionData"));
    setPropertyPurposeData(FormData.get("propertyPurposeData"));
  };

  const handleInputChange = (field: string, value: string) => {
    // Update the input value and clear the associated error
    if (field === "title") {
      setTitle(value);
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
    if (field === "description") {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleCreatePost = () => {
    // Gather all form data
    const formData = {
      title: titleData,
      description: descriptpData,
      // Include other necessary form data
    };

    // Log the form data (you can replace this with an API call to submit the data)
    console.log("Creating post with the following data:", formData);

    // Close the 'Create Post' popup
    setShowPopupCreate(false);

    // Show the success popup
    setShowSuccessPopup(true);

    // Optionally, you can reset the form or clear input fields
    setTitleData("");
    setDescriptionData("");
  };

  // Handle keydown events
  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    // If the Enter key is pressed, move to the next input/component
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submit behavior

      if (field === "title" && title.trim()) {
        // Move focus to the description input
        descriptionInputRef.current?.focus();
      } else if (field === "description" && description.trim()) {
        // Move to the PropertyPurpose section
        propertyPurposeRef.current?.focus();
      } else if (field === "propertyPurpose" && propertyPurposeRef.current) {
        // Move to the InformationProperty section
        infoRef.current?.focus();
      } else if (field === "informationProperty" && infoRef.current) {
        // Move to the LocationProperty section
        locationRef.current?.focus();
      } else if (field === "locationProperty" && locationRef.current) {
        // Move to the PropertyPost section
        propertyPostRef.current?.focus();
      }
    }
    // You can also add more functionality for other keys if needed
    if (e.key === "Escape") {
      e.preventDefault();
      handleClearAll(); // Clear inputs if Escape is pressed
    }
  };

  const handleSubmit = () => {
    let formIsValid = true;

    // Validate title and description
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
      formIsValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      formIsValid = false;
    }

    // Validate InformationProperty inputs
    if (infoRef.current) {
      const { isValid, formData } = infoRef.current.validate();
      if (!isValid) {
        formIsValid = false;
        setErrorMessage("Please fill out all required fields.");
      } else {
        console.log("Form Data:", formData);
        setErrorMessage(null);
      }
    }

    // Validate PropertyPurpose selection
    if (propertyPurposeRef.current) {
      const isValid = propertyPurposeRef.current.validateSelection();
      if (!isValid) {
        formIsValid = false;
      } else {
        const selectedPurpose = propertyPurposeRef.current.getSelected();
        console.log("Selected Property Purpose:", selectedPurpose);
      }
    }

    // Validate LocationProperty inputs
    if (locationRef.current) {
      const { isValid, data } = locationRef.current.validate();
      if (!isValid) {
        formIsValid = false;
        setErrorMessage("Please fill out all required location fields.");
      } else {
        console.log("Location Data:", data);
        setErrorMessage(null);
      }
    }

    // Validate PropertyPost inputs
    if (propertyPostRef.current) {
      const isValid = propertyPostRef.current.validate();
      if (!isValid) {
        formIsValid = false;
      } else {
        const selectedOption = propertyPostRef.current.getSelectedOption();
        console.log("Selected Property Type:", selectedOption?.name);
      }
    }

    // Set errors and show error message if validation failed
    setErrors(newErrors);

    if (formIsValid) {
      // Show the create popup if form is valid
      setShowPopupCreate(true);
      setErrorMessage(null); // Hide error message if the form is valid
    } else {
      // Show the error popup if form is invalid
      setShowPopupErrorCreate(true);
      setShowPopupCreate(false); // Hide the create popup if form is invalid
    }
  };

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setSelectedProperty(null);
    setErrors({});
    setShowPopup(false); // Close the popup after clearing

    infoRef.current?.clear();
    propertyPurposeRef.current?.clear();
    locationRef.current?.clear();
    propertyPostRef.current?.clear();
  };

  return (
    <>
      <form className="h-full mt-[150px] bg-[#F6F6F6]" action={SendMessage}>
        <div className="ms-[130px] me-[130px]">
          {/* Property Purpose */}
          <PropertyPurpose
            ref={propertyPurposeRef}
            message={propertyPurposeData}
          />

          {/* Line */}
          <div className="mt-10 left-0 w-full h-px bg-black"></div>

          {/* Overview Section */}
          <div className="mt-10 flex items-center space-x-3">
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
            <span className="text-lg font-bold text-gray-900">Overview</span>
          </div>

          {/* Title Field */}
          <div className="mt-5 ms-10">
            <label className="font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleInputRef}
              name="titleData"
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "title")}
              className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 ${
                errors.title ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mt-5 ms-10">
            <label className="font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              ref={descriptionInputRef}
              type="text"
              name="discriptionData"
              placeholder="Enter your description"
              value={description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "description")}
              className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 ${
                errors.description ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Line */}
          <hr className="mt-10 w-full h-px border-black" />

          {/* Property Type Section */}
          <div className="mt-10 flex items-center space-x-3">
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
            <span className="text-lg font-medium text-gray-900">
              Property type
            </span>
          </div>

          <div className="mt-5 ms-10">
            <label className="font-bold">
              Type: <span className="text-red-500">*</span>
            </label>
            <PropertyPost
              ref={propertyPostRef}
              onChange={(selectedOption) =>
                console.log("Property type changed to:", selectedOption.name)
              }
            />
          </div>

          {/* Line */}
          <div className="mt-10 w-full h-px bg-black"></div>

          <InformationProperty ref={infoRef} />

          {/* Line */}
          <hr className="mt-10 w-full h-px border-black" />

          {/* Location Section */}
          <LocationProperty ref={locationRef} />

          {/* Action Buttons */}
          <div className="flex flex-row justify-end mt-10">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150"
              onClick={() => setShowPopup(true)} // Show the confirmation popup
            >
              Clear all
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              Priview
            </button>
          </div>
        </div>
        {/* Confirmation Clear all Popup */}
        {showPopup && (
          <div className="shadow mx-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              {/* Content */}
              <div className="p-6 pt-0 text-center">
                <svg
                  className="w-20 h-20 text-red-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                  Do you want to clear all inputs?
                </h3>
                <a
                  type="submit"
                  onClick={() => setShowPopup(false)} // Close the popup
                  href="#"
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 me-2 text-center hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  No, cancel
                </a>
                <a
                  type="submit"
                  onClick={handleClearAll} // Clear all inputs
                  href="#"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Yes, I`m sure
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Create button pop up */}
        {showPopupCreate && (
          <div className="shadow mx-auto fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[80%]">
              {/* Content */}

              <svg
                className="w-20 h-20 text-red-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <div className="p-6 pt-0 text-center">
                <h1 className="text-2xl font-normal text-gray-500 mt-5 mb-6">
                  Here is your information about your property for
                </h1>

                <div className="mb-5">
                  <h1>title: {titleData}</h1>
                </div>
                <div className="mb-5">
                  <h1>Description: {descriptpData}</h1>
                </div>

                <a
                  type="submit"
                  onClick={() => setShowPopupCreate(false)} // Close the popup
                  href="#"
                  className="text-gray-900 bg-white hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-red-100 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 me-2 text-center hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Wait a moment
                </a>
                <a
                  type="submit"
                  onClick={() => handleCreatePost()} // Clear all inputs
                  href="#"
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Create
                </a>
              </div>
            </div>
          </div>
        )}
        {/* pop up success */}
        {showSuccessPopup && (
          <div className="shadow mx-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[80%] transition-transform duration-300 ">
              {/* Success Content */}
              <svg
                className="w-20 h-20 text-green-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <div className="p-6 pt-0 text-center">
                <h1 className="text-2xl font-normal text-gray-500 mt-5 mb-6">
                  Your post has been successfully created!
                </h1>

                <a
                  type="button"
                  onClick={() => setShowSuccessPopup(false)} // Close the success popup
                  href="#"
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Done
                </a>
              </div>
            </div>
          </div>
        )}
        ;{/* Error create pop up */}
        {showPopupErrorCreate && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
              showPopupErrorCreate ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`bg-white p-6 rounded-lg shadow-lg relative transform transition-all duration-300 ease-out ${
                showPopupErrorCreate
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0"
              }`}
            >
              {/* Content */}
              <div className="p-6 pt-0 text-center">
                <svg
                  className="w-[110px] h-[110px] text-red-600 mx-auto "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h1 className="text-4xl text-black ">Opp!!!</h1>
                <br />
                <p className="mb-5">
                  You`ve forgot to fill some information!!
                  <br /> please check again
                </p>

                <a
                  type="submit"
                  onClick={() => setShowPopupErrorCreate(false)} // Close the popup
                  href="#"
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 me-2 text-center hover:scale-105 active:scale-95 transition-transform duration-150"
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default Page;
