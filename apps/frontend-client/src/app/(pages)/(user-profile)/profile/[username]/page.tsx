// app/profile/[username]/page.tsx

import React from "react";
import Layout from "../layout";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import ProfilePageClient from "@/components/molecules/profile-page-client/ProfilePageClient"; // Import client component
import { User } from "@/context/user.type";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";

async function fetchUserDetails(username: string): Promise<User | null> {
  //console.log("Fetching user details for username:", username);

  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?userName=${username}`);
    // console.log(res.data);

    return res.data.users[0] || null;
  } catch (error) {
    // console.error("Error fetching user details:", error);
    return null;
  }
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  // No need to encode the username
  //console.log("Username from params:", username);

  const user = await fetchUserDetails(username);
  //console.log("Fetched User:", user);

  if (!user) {
    return <div>User not found</div>; // Render a message if user data is not found
  }

  return (
    <Layout>
      <div>
        <UserProfileHeader user={user} />
        <ListedProperties />
      </div>
    </Layout>
  );
};

export default ProfilePage;
