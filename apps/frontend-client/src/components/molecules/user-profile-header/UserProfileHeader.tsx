'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import Banner from '@/components/molecules/banner/Banner';
import { FaCamera } from 'react-icons/fa';
import UserProfileNavigation from '../user-profile-navigation/UserProfileNavigation';
import { User } from '@/context/user.type';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import getCroppedImg from '@/libs/cropImage';

export interface UserProfileHeaderProps {
  user: User;
}

// Helper function to format joinedDate
const formatDate = (dateString?: string): string => {
  if (!dateString) return "Unknown date"; 
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MAX_FILE_SIZE_MB = 5; 
const MAX_WIDTH = 1920; 
const MAX_HEIGHT = 1080;

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const [userState, setUserState] = useState<User>(user);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 }); 
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null); 
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isProfileCrop, setIsProfileCrop] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  // console.log('user:: ', user)

  // Handle file change for uploading (background or profile)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isProfile: boolean) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller image.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropModalOpen(true);
      setIsProfileCrop(isProfile); 
    };
    reader.readAsDataURL(file);
  };

  // Resize image using a canvas to reduce file size
  const resizeImage = async (image: HTMLImageElement): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const aspectRatio = image.width / image.height;

    // Resize based on max dimensions
    if (image.width > MAX_WIDTH || image.height > MAX_HEIGHT) {
      if (aspectRatio > 1) {
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_WIDTH / aspectRatio;
      } else {
        canvas.height = MAX_HEIGHT;
        canvas.width = MAX_HEIGHT * aspectRatio;
      }
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', 0.8); 
    });
  };

  // Handle crop and upload logic
  const handleCropComplete = async () => {
    try {
      if (!croppedAreaPixels || !imageSrc) {
        alert('Cropping is not completed.');
        return;
      }
  
      setLoading(true); 
      setError(null); 
  
      // Generate cropped image as a Blob
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  
      if (!croppedImage) {
        throw new Error('Failed to generate cropped image.');
      }
  
      // Convert the cropped Blob into an HTMLImageElement for resizing
      const createImageElement = async (blob: Blob): Promise<HTMLImageElement> => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
  
        return new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = (error) => reject(error);
        });
      };
  
      const imageElement = await createImageElement(croppedImage);
  
      // Resize the image if needed
      const resizedImage = await resizeImage(imageElement);
  
      const formData = new FormData();
      const endpoint = isProfileCrop ? 'profileFiles' : 'backgroundFiles';
      formData.append(endpoint, resizedImage);
  
      // Send the image to the server
      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response?.data) {
        // Update the user state for either profile or background image
        setUserState((prevUser) => ({
          ...prevUser,
          [isProfileCrop ? 'profile' : 'background']: response.data[isProfileCrop ? 'profile' : 'background'],
        }));
        console.log(`${isProfileCrop ? 'Profile' : 'Background'} photo uploaded successfully.`);
        setIsCropModalOpen(false); // Close the modal after successful upload
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error cropping and uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  

  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <Banner
          background={
            userState.background?.[userState.background.length - 1] || '/images/default-banner.jpg'
          }
        />
        <div className="max-w-[1300px] mx-auto relative">
          {/* Edit cover photo button */}
          <div className="absolute right-[0px] bottom-[50px] flex justify-end pr-[10px] xl:pr-0">
            <div className="flex items-center bg-white font-helvetica text-helvetica-paragraph text-charcoal px-[10px] py-[5px] rounded-md">
              <label
                htmlFor="background-input"
                className="cursor-pointer flex items-center justify-center"
              >
                <FaCamera className="text-charcoal mx-[10px]" />
                <span>Edit cover photo</span>
              </label>
              <input
                type="file"
                id="background-input"
                className="hidden"
                onChange={(e) => handleFileChange(e, false)} // Handle background crop
              />
            </div>
          </div>

          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            {/* User Profile Photo */}
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image
                  src={
                    userState.profile?.[userState.profile.length - 1]
                      ? `${userState.profile[userState.profile.length - 1]}?t=${new Date().getTime()}`
                      : '/images/default-profile.jpg'
                  }
                  alt="user"
                  width={125}
                  height={125}
                />
              </div>
              <label
                htmlFor="profile-photo-input"
                className="sm:ml-[100px] sm:mt-[70px] ml-[100px] mt-[70px] absolute sm:w-[37px] w-[25px] h-[25px] flex items-center justify-center sm:h-[37px] rounded-full bg-pale-gray cursor-pointer"
              >
                <FaCamera className="text-charcoal sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]" />
              </label>
              <input
                type="file"
                id="profile-photo-input"
                className="hidden"
                onChange={(e) => handleFileChange(e, true)} // Handle profile crop
              />
            </div>
            {/* User name */}
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                { user.userName || 'Unknown'}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {formatDate(user.createdAt)} {/* Formatted joined date */}
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for cropping */}
      {isCropModalOpen && imageSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white py-6 px-[200px] rounded-md">
            <h3 className="text-xl font-semibold mb-4">
            Customize Your {isProfileCrop ? 'Profile Picture' : 'Background Image'}
            </h3>
            <div className="relative w-[450px] h-[450px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={isProfileCrop ? 1 : 21 / 9} // Dynamically adjust aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error Message */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-12 py-2 font-bold rounded-lg"
                onClick={() => setIsCropModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-olive-drab text-white px-12 font-bold py-2 rounded-lg"
                onClick={handleCropComplete}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UserProfileNavigation */}
      <UserProfileNavigation userName={userState.userName} />
    </>
  );
};

export default UserProfileHeader;
