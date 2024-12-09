// profile/[username]/page.tsx
import React from "react";
import Layout from "../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { VisitProfileHeaderProps } from "@/libs/types/user-types/user";
import UserPostedProperties from "@/components/organisms/user-posted-properties/UserPostedProperties";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";


async function fetchUserDetails(cognitosub: string) {
  try {
    const responses = await axiosInstance.get(`${API_ENDPOINTS.GET_PROFILE_USER}/${cognitosub}`);

    return responses.data as VisitProfileHeaderProps;
  } catch (error) {
    throw error;
  }
}
const ProfilePage = async ({ params }: { params: { cognitosub: string } }) => {
  const user = await fetchUserDetails(params.cognitosub);
  // console.log("user :: ", user); // Check what the user object looks like
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <VisitProfileHeader user={user} />
        <div className="max-w-[1300px] mx-auto">
          <UserPostedProperties items={user.properties as RealEstateItem[]} />
        </div>
      </div>
    </Layout>
  );
};




export default ProfilePage;
