// profile/[username]/page.tsx

import React from "react";
import Layout from "../layout";
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { notFound } from "next/navigation"; // Import notFound to handle user not found

async function fetchUserDetails(username: string) {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?username=${username}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    console.log("user response:: ", res.data.users[0]);
    // Assuming the API response is structured as shown
    return res.data.users[0]; // Get the first user from the array
  } catch (error) {
    console.error(error);
    return null;
  }
}


const ProfilePage = async ({ params }: {params:{username:string}}) => {
  console.log("Params:: ",params);
  
  const { username } = params;

  const user = await fetchUserDetails(username); // Fetch user data here
console.log("get user by name:: ",user)
  if (!user) {
    notFound(); // This will trigger a 404 page if user data is not found
  }

  return (
    <Layout>
      <div>
        <UserProfileHeader user={user} />
        <ListedProperties user={username} />
      </div>
    </Layout>
  );
};

export default ProfilePage;