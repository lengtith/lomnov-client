'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import Banner from '@/components/molecules/banner/Banner';
import { FaCamera } from 'react-icons/fa';
import UserSettingNavigation from '../user-setting-navigation/UserSettingNavigation';
import { User } from '@/context/user.type';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import getCroppedImg from '@/libs/cropImage';

interface UserSittingHeaderProps {
  user: User;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const MAX_FILE_SIZE_MB = 5;

const UserSettingHeader = ({ user }: UserSittingHeaderProps) => {
  const [userState, setUserState] = useState<User>(user);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isProfileCrop, setIsProfileCrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("user in setting header:: ", user)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isProfile: boolean) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropModalOpen(true);
      setIsProfileCrop(isProfile);
    };
    reader.readAsDataURL(file);
    setError(null); // Clear any previous errors
  };

  const handleCropComplete = async () => {
    try {
      if (!croppedAreaPixels || !imageSrc) {
        setError('Cropping is not completed.');
        return;
      }

      setLoading(true);

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) throw new Error('Failed to generate cropped image.');

      const formData = new FormData();
      const endpoint = isProfileCrop ? 'profileFiles' : 'backgroundFiles';
      formData.append(endpoint, croppedImage);

      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data) {
        setUserState((prevUser) => ({
          ...prevUser,
          [isProfileCrop ? 'profile' : 'background']: response.data[isProfileCrop ? 'profile' : 'background'],
        }));
        setIsCropModalOpen(false);
        setError(null);
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error: any) {
      console.error('Error uploading cropped image:', error);
      setError(error.message || 'An error occurred during the upload process.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Banner
          background={
            userState.background?.[userState.background.length - 1] || '/images/default-banner.jpg'
          }
        />

        <div className="max-w-[1300px] mx-auto relative">
          <div className="absolute right-0 bottom-[50px] flex justify-end pr-[10px] xl:pr-0">
            <div className="flex items-center bg-white font-helvetica text-helvetica-paragraph text-charcoal px-[10px] py-[5px] rounded-md">
              <label htmlFor="background-input" className="cursor-pointer flex items-center justify-center">
                <FaCamera className="text-charcoal mx-[10px]" />
                <span>Edit cover photo</span>
              </label>
              <input
                type="file"
                id="background-input"
                className="hidden"
                onChange={(e) => handleFileChange(e, false)}
              />
            </div>
          </div>

          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                  src={
                    userState.profile?.[userState.profile.length - 1]
                      ? `${userState.profile[userState.profile.length - 1]}?t=${new Date().getTime()}`
                      : '/images/default-profile.jpg'
                  }
                  alt="User"
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
                onChange={(e) => handleFileChange(e, true)}
              />
            </div>

            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {userState.userName || 'Unknown User'}
              </span>
              <span className="flex items-center mt-[10px] text-olive-gray">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {formatDate(userState.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isCropModalOpen && imageSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white py-6 px-8 rounded-md">
            <h3 className="text-xl font-semibold mb-4">
              Customize Your {isProfileCrop ? 'Profile Picture' : 'Background Image'}
            </h3>
            <div className="relative w-[450px] h-[450px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={isProfileCrop ? 1 : 21 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setIsCropModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-olive-green px-4 py-2 rounded-md text-white"
                onClick={handleCropComplete}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Save'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}

      <UserSettingNavigation userName={userState.userName || ''} />
    </>
  );
};

export default UserSettingHeader;