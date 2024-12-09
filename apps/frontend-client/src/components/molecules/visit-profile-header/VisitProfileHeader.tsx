
"use client"

import React, { useState } from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import VisitProfileNavigation from "../visit-profile-navigation/VisitProfileNavigation";
import ShareIcon from "@/icons/ShareIcon";
import { VisitProfileHeaderProps } from "@/libs/types/user-types/user";
import { formatDate } from "@/libs/functions/formatDate";
import SharesToSocial from "@/components/atoms/shares-social/SharesToSocial";

const VisitProfileHeader = ({ user }: { user: VisitProfileHeaderProps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const cognitosub = user?.user?.cognitoSub;
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility

  return (
    <>
      <div className="relative">
        <Banner background={user?.user?.background ? user?.user.background[user?.user.background?.length - 1] : '/default-banner.jpeg'} />
        <div className="max-w-[1300px] mx-auto relative">
          {/* Edit cover photo button */}
          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            {/* User profile */}
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image src={user?.user?.profile?.length ? user.user.profile[user?.user.profile.length - 1] : '/default-profile.jpeg'} alt="user" width={125} height={125} />
              </div>
            </div>
            {/* User name */}
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {user?.user?.userName || "Unknown"}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {user?.user?.createdAt ? formatDate(user?.user?.createdAt) : 'Unknown date'}
              </span>
            </div>
          </div>

          <div className="flex absolute justify-end right-0 -bottom-[120px] space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal pr-[10px] xl:pr-0">
            <button onClick={() => window.open(`tel:`)} className="py-[5px] px-[25px] rounded-[8px] bg-neutral">
              Call Now
            </button>


            {/* Share Button */}
            <div className="relative">
              <button
                className="py-[6px] px-[24px] flex items-center justify-center rounded-[8px] bg-pale-gray hover:bg-gray-200 transition-all duration-200 ease-in-out"
                onClick={toggleDropdown}
              >
                <ShareIcon props="w-[20px] h-[20px] text-olive-green mr-[8px]" />
                Share
              </button>
              {/* Dropdown menu for social media icons */}
              {isDropdownOpen && (
                <SharesToSocial linkURL={window.location.href}/>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* UserProfileNavigation */}
      <VisitProfileNavigation cognitosub={cognitosub!} />
    </>
  );
};

export default VisitProfileHeader;
