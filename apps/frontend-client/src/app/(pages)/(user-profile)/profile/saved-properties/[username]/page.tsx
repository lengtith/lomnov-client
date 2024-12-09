// // profile/saved-properties/[username]/page.tsx
import React from "react";
import Layout from "../../layout"; // Import the layout
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader"; // Adjust this to your file path
import SavedProperties from "@/components/organisms/saved-properties/SavedProperties";

import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import axiosInstance from "@/libs/axios";
//####################################################################


async function fetchUserDetails(username: string) {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?userName=${username}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    //console.log("user response:: ", res.data.users[0]);
    // Assuming the API response is structured as shown
    return res.data.users[0]; // Get the first user from the array
  } catch (error) {
    console.error(error);
    return null;
  }
}


const SavedPropertiesPage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);


  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <Layout>
      <UserProfileHeader user={user} /> {/* Reusing the ProfileHeader */}
      {/* This is list property */}
      <SavedProperties />
    </Layout>
  );
};
// This function gets called at build time
export async function generateStaticParams() {
  // Here you should provide the list of usernames you want to pre-render
  const usernames = ['sokphol', 'sunteang', 'Dara']; // Example usernames
  return usernames.map((username) => ({
    username,
  }));
}
export default SavedPropertiesPage;


