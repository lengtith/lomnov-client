"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const PasswordForm = () => {
  const initialFormData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [originalFormData, setOriginalFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State for password visibility
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Detect form changes
  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(originalFormData));
  }, [formData, originalFormData]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Password strength validation
  const validatePassword = (password: string) => {
    // Minimum 8 characters, at least one letter, one number, and one special character
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordStrengthRegex.test(password);
  };

  // Reset form data on cancel
  const handleCancel = () => {
    setFormData(originalFormData);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if new passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    // Validate password strength
    if (!validatePassword(formData.newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long, include a number, and a special character."
      );
      setSuccessMessage("");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        previousPassword: formData.currentPassword,
        proposedPassword: formData.newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully.");
        setFormData(initialFormData);  // Reset form data
        setOriginalFormData(initialFormData); // Reset the original data
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Failed to change password. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle visibility for passwords
  const togglePasswordVisibility = (field: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur(); // Removes focus from the button after click

    if (field === "currentPassword") {
      setCurrentPasswordVisible(!currentPasswordVisible);
    } else if (field === "newPassword") {
      setNewPasswordVisible(!newPasswordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] mt-10 p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >

      {/* Render input fields */}
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="relative">
          <label className="block mb-[5px] font-bold capitalize">{key}</label>
          <div className="relative">
            <input
              type={key === "currentPassword" ? (currentPasswordVisible ? "text" : "password") :
                    key === "newPassword" ? (newPasswordVisible ? "text" : "password") :
                    (confirmPasswordVisible ? "text" : "password")}
              name={key}
              value={value}
              onChange={handleChange}
              className="h-[40px] rounded-[8px] border border-pale-gray w-full pr-10"
              required
            />
            {/* Eye Icon for password toggle */}
            <button
              type="button"
              onClick={(e) => togglePasswordVisibility(key, e)}
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 p-1"
              aria-label={`Toggle visibility for ${key}`}
            >
              {key === "currentPassword" && (currentPasswordVisible ? <FaEyeSlash /> : <FaEye />)}
              {key === "newPassword" && (newPasswordVisible ? <FaEyeSlash /> : <FaEye />)}
              {key === "confirmPassword" && (confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />)}
            </button>
          </div>
        </div>
      ))}

      {/* Show error message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      {/* Show success message */}
      {successMessage && (
        <div className="text-green-500 text-sm mb-4">{successMessage}</div>
      )}
      <div className="flex justify-end space-x-[10px] pt-[5px]">
        {/* Cancel button */}
        <button
          type="button"
          onClick={handleCancel}
          className={`mr-[10px] py-[5px] border-b-2 border-black ${
            isChanged
              ? "hover:text-neutral text-black hover:border-neutral"
              : "text-gray-400 border-b-2 border-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged || isSaving} 
        >
          Cancel
        </button>

        {/* Save Changes button */}
        <button
          type="submit"
          className={`px-[10px] py-[5px] rounded-[8px] ${
            isChanged && !isSaving
              ? "hover:bg-neutral bg-olive-drab text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged || isSaving} 
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
