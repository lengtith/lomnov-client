// components/molecules/user-setting-navigation/UserProfileNavigation.tsx

"use client"; // Enable client-side rendering for this component
import React from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path
import Link from "next/link";


const UserSettingNavigation = ({ cognitosub }: {cognitosub:string}) => {
  const pathname = usePathname(); // Get the current path

  const isPostActive = pathname === `/view-profile/${cognitosub}`;
  const isContactActive = pathname === `/view-profile/contact/${cognitosub}`;

  return (
    <div className="w-full mt-[70px] mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/view-profile/${cognitosub}`}
            className={`py-[20px] ml-[10px] xl:ml-0 ${
              isPostActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            Post
          </Link>
          <Link
            href={`/view-profile/contact/${cognitosub}`}
            className={`mx-[40px] py-[20px] ${
              isContactActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSettingNavigation;