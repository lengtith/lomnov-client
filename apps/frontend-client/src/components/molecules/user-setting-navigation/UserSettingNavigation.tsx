"use client"; // Enable client-side rendering for this component
import React from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path
import Link from "next/link";

interface UserProfileNavigationProps {
  userName: string;
}

const UserSettingNavigation = ({ userName }: UserProfileNavigationProps) => {
  const pathname = usePathname(); // Get the current path

  const isGeneralInfoActive = pathname === `/setting/${userName}`;
  const isPasswordActive = pathname === `/setting/password/${userName}`;

  return (
    <div className="w-full mt-[70px] mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/setting/${userName}`}
            className={`py-[20px] ml-[10px] xl:ml-0 ${
              isGeneralInfoActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            General Info
          </Link>
          <Link
            href={`/setting/password/${userName}`}
            className={`mx-[40px] py-[20px] ${
              isPasswordActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSettingNavigation;