"use client";
import React, { useState } from "react";
import GeneralInfoForm from "@/components/organisms/general-info-form/GeneralInfoForm";
import PasswordForm from "@/components/organisms/password-form/PasswordForm";
import { UserProfileHeaderProps } from "../user-profile-header/UserProfileHeader";

const SettingTabs = ({ user }: UserProfileHeaderProps ) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <button
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "general"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("general")}
          >
            General Info
          </button>

          <button
            className={`mx-[40px] py-[20px] ${
              activeTab === "password"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>
      </div>

      <div className="p-[10px] xl:p-0 max-w-[1300px] mx-auto">
        {activeTab === "general" && (
          <div className="mt-[20px]">
            <GeneralInfoForm user={user} />
          </div>
        )}
        {activeTab === "password" && (
          <div className="mt-[20px]">
           <PasswordForm/>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingTabs;
