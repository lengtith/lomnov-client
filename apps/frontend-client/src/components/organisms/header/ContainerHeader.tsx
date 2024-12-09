"use client";

import React, { useState, useEffect } from "react";
import NavigateList from "@/components/molecules/navigate-list/NavigateList";
import Menu from "@/icons/Menu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/lomnov-logo.png";
import SelectLang from "@/components/molecules/select-lang/SelectLang";
import { Setting, SignOut, User } from "@/icons";
import { useAuth } from "@/context/user";

interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string;
}

export interface MenuProp {
  menu: IMenus[];
}

function ContainerHeader({ menu }: MenuProp) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("/images/default-profile.jpg");

  // Sync profile image when the user profile updates
  useEffect(() => {
    if (user?.profile && user.profile.length > 0) {
      // Use the last image in the profile array
      setProfileImage(user.profile[user.profile.length - 1]);
    }
  }, [user?.profile]);

  const handleClickMenu = () => {
    setIsMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleImageError = () => {
    setProfileImage("/images/default-profile.jpg"); // Revert to default on error
  };

  return (
    <>
      <div className="xl:w-[1300px] w-full lg:m-auto h-full flex flex-row items-center justify-between py-3 px-3 xl:px-0 z-20">
        {/* Menu Icon */}
        <div onClick={handleClickMenu} className="md:hidden mt-4">
          <Menu props="mr-2 text-[25px] text-white" />
        </div>

        {/* Logo */}
        <Link href={"/"} className="w-[50%] md:w-[30%] xl:w-[20%] flex gap-2 md:gap-3 items-center justify-start">
          <div className="lg:w-[100px] lg:h-[60px] w-[100px] h-[70px] flex items-center">
            <Image src={logo} alt="Logo" width="800" height="800" objectFit="cover" />
          </div>
        </Link>

        {/* Navigation List */}
        <div
          className={
            isMenu
              ? `lg:w-[40%] xl:w-[50%] w-[65%] h-[100vh] md:h-fit bg-gradient-to-r bg-gray md:bg-transparent shadow-lg md:shadow-none fixed md:static left-0 top-0 flex md:flex-row flex-col md:items-center md:justify-center transition-all ease-in-out duration-500 bg-olive-green`
              : "lg:w-[40%] xl:w-[60%] w-[65%] h-[100vh] md:h-auto bg-gradient-to-r md:bg-transparent shadow-lg md:shadow-none fixed md:static left-[-100%] top-0 flex md:flex-row flex-col md:items-center  md:justify-center transition-all ease-in-out duration-500"
          }
        >
          <NavigateList menu={menu} />
          <div className="md:hidden w-[100px] bg-white">
            <SelectLang />
          </div>
        </div>

        {/* User Actions */}
        <div className="w-[50%] md:w-[30%] xl:w-[20%] flex gap-3 items-center justify-end">
          <div className="hidden md:flex w-[150px]">
            <SelectLang />
          </div>

          {isAuthenticated ? (
            <div className="relative">
              {/* User Avatar */}
              <div
                className="w-[50px] h-[50px] rounded-full bg-black border flex justify-center items-center overflow-hidden relative cursor-pointer"
                onClick={toggleDropdown}
              >
                <Image
                  src={profileImage}
                  alt="User Profile"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                  onError={handleImageError} // Handle image load error
                />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="w-[220px] bg-white absolute right-0 mt-2 rounded-md flex flex-col items-center px-3 py-2">
                  {/* Profile Information */}
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <div className="overflow-hidden w-[50px] h-[50px] rounded-full border-[1px] border-blue-400">
                      <Image
                        src={profileImage}
                        alt="User Profile"
                        width={50}
                        height={50}
                        onError={handleImageError} // Handle image load error
                      />
                    </div>
                    <p className="text-[14px]">{user?.userName || "Unknown User"}</p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col items-start justify-start mt-3 border-y-[1px] border-y-blue-500 w-full py-3">
                    <Link
                      href={`/profile/${user?.userName}`}
                      className="hover:bg-blue-500 hover:text-white w-full rounded-[10px] p-2 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-150"
                    >
                      <User props="text-olive-green hover:text-white" /> Profile
                    </Link>
                    <Link
                      href={`/setting/${user?.userName}`}
                      className="hover:bg-blue-500 hover:text-white w-full rounded-[10px] p-2 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-150"
                    >
                      <Setting props="text-olive-green hover:text-white" /> Settings
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <button
                    className="mt-2 p-2 w-full rounded-[10px] font-[500] flex items-center hover:bg-red-500 hover:text-white"
                    onClick={handleLogout}
                  >
                    <SignOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login Button
            <Link
              href="/signin"
              className="md:py-[5px] md:px-5 py-[5px] px-4 border-[1px] md:border-[2px] border-[#E5D2B0] rounded-[8px] md:text-[18px] text-white md:font-[600] font-[500] hover:border-white hover:scale-105 active:border-white active:scale-95 transition-transform duration-150"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenu && (
        <div
          className="fixed top-0 left-0 bg-[#00000027] w-full h-screen md:hidden -z-10"
          onClick={handleClickMenu}
        ></div>
      )}
    </>
  );
}

export default ContainerHeader;
