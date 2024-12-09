// app/sitting/[username]/page.tsx

import React from "react";
import Layout from "../layout";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import { User } from "@/context/user.type";
import GeneralInfoForm from "@/components/organisms/general-info-form/GeneralInfoForm";

async function fetchUserDetails(username: string): Promise<User | null> {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?userName=${username}`);
    return res.data.users[0] || null;
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

const SettingsPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  // Fetch user details
  const user = await fetchUserDetails(username);

  if (!user) {
    return <div>User not found</div>; // Render a message if user data is not found
  }

  return (
    <Layout>
      <div>
        {/* Render the Header */}
        <UserSettingHeader user={user} />

        {/* Pass the `user` prop to GeneralInfoForm */}
        <div className="max-w-[1300px] mx-auto">

        <GeneralInfoForm user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
