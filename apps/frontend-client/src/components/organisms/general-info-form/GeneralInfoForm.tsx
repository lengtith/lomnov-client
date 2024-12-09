"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/libs/types/user-types/user";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { UserProfileHeaderProps } from "@/components/molecules/user-profile-header/UserProfileHeader";

const GeneralInfoForm = ({ user }: UserProfileHeaderProps) => {
  const initialFormData = {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    address: user.address,
    phoneNumber: user.phoneNumber,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [originalFormData, setOriginalFormData] = useState(initialFormData); // Store the original form data to track changes
  const [isChanged, setIsChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Track changes in the form
  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(originalFormData));
  }, [formData, originalFormData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Cancel and reset form
  const handleCancel = () => {
    setFormData(originalFormData); // Reset form data to the original values
    setError(null);
    setSuccess(null);
  };

  // Submit the updated user info
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    console.log("Submitting form data:", formData);

    try {
      // Using a FormData instance to handle compatibility with multipart/form-data
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value as string);
      });

      // Sending the PUT request to the backend
      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, payload, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure compatibility with file uploads
        },
      });

      console.log("User updated successfully:", response.data);

      // Update form data and original form data with the response
      const updatedData = {
        userName: response.data.userName,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        location: response.data.location,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
      };

      setFormData(updatedData);
      setOriginalFormData(updatedData); // Update the original data to match the new data
      setIsSaving(false);
      setSuccess("User information updated successfully!");
    } catch (err: any) {
      setIsSaving(false);
      setError(
        err.response?.data?.error_message || "Error updating user information. Please try again."
      );
      console.error("Error updating user info:", err.response || err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] mt-10 p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-[5px] font-bold capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="h-[40px] rounded-[8px] border border-pale-gray w-full"
          />
        </div>
      ))}
      <div className="flex justify-end space-x-[10px] pt-[5px]">
        <button
          type="button"
          onClick={handleCancel}
          className={`mr-[10px] py-[5px] border-b-2 border-black ${
            isChanged
              ? "hover:text-neutral text-black hover:border-neutral"
              : "text-gray-400 border-b-2 border-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-[10px] py-[5px] rounded-[8px] ${
            isChanged
              ? "hover:bg-neutral bg-olive-drab text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
    </form>
  );
};

export default GeneralInfoForm;
