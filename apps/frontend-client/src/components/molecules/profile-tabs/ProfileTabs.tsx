"use client";
import React, { useState } from "react";
import { User } from "@/libs/types/user-types/user";
import SavedProperties from "@/components/organisms/saved-properties/SavedProperties";
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";

const ProfileTabs = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState("saved-property");

  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <button
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "saved-property"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("saved-property")}
          >
            Saved Property
          </button>

          <button
            className={`mx-[40px] py-[20px] ${
              activeTab === "listed-property"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("listed-property")}
          >
            Listed Property
          </button>
        </div>
      </div>

      <div className="p-[10px] xl:p-0 max-w-[1300px] mx-auto">
        {activeTab === "saved-property" && (
          <div className="mt-[20px]">
            <SavedProperties/>
          </div>
        )}
        {activeTab === "listed-property" && (
          <div className="mt-[20px]">
            {/* <ListedProperties userId={user.id} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
