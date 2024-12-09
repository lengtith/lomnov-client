// profile/saved-properties/[username]/page.tsx

import React from "react";
import Layout from "../../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import Email from "@/icons/Email";
import Phone from "@/icons/Phone";
import Location from "@/icons/Location";
import Address from "@/icons/Home";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

async function fetchUserDetails(cognitosub: string) {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.GET_PROFILE_USER}/${cognitosub}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
}

const SavedPropertiesPage = async ({
  params,
}: {
  params: { cognitosub: string };
}) => {
  const user = await fetchUserDetails(params.cognitosub);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <VisitProfileHeader user={user} />
      <div className="max-w-[1300px] mx-auto p-4">
        <div className="bg-white w-full sm:w-[688px] h-auto sm:h-[257px] mt-5 p-5 rounded-lg">
          <h3 className="font-bold text-lg mb-5">Contact info</h3>
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Email props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Email</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.user.email}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Phone number</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.user.phoneNumber}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3">
              <Location className="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Location</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.user.location}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-3">
              <Address props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Address</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.user.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// This function gets called at build time
export async function generateStaticParams() {
  // Replace this with the actual logic to get the list of usernames
  const usernames = ['user1', 'user2', 'user3']; // Example usernames
  return usernames.map((username) => ({
    username,
  }));
}

export default SavedPropertiesPage;
