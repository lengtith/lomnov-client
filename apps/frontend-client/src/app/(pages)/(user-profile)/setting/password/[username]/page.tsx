// setting/password/[username]/page.tsx

import React from "react";
import Layout from "../../layout"; // Import the layout
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import PasswordForm from "@/components/organisms/password-form/PasswordForm";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

async function fetchUserDetails(username: string) {
  try{
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.USER}?userName=${username}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    // const user = await res.json();
    return res.data.users[0]; // Adjust this based on your API response
  } catch(error){
    console.error("Error:: ", error)
    return null
  }

}

const PasswordPage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <UserSettingHeader user={user} /> {/* Reusing the ProfileHeader */}
      <div className="max-w-[1300px] mx-auto">
        <PasswordForm />
      </div>
    </Layout>
  );
};
// This function gets called at build time
export async function generateStaticParams() {
  // Replace this with the actual logic to get the list of usernames
  const usernames = ['rong', 'teang', 'phol']; // Example usernames
  return usernames.map((username) => ({
    username,
  }));
}

export default PasswordPage;
