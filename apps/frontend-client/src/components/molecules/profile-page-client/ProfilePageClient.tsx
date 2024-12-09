

'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";
import { User } from "@/context/user.type";

interface ProfilePageClientProps {
  user: User;
  usernameParam: string;
}

const ProfilePageClient = ({ user, usernameParam }: ProfilePageClientProps) => {
  const router = useRouter();

  // Debugging console logs
  console.log("user.userName:", user.userName);
  console.log("usernameParam:", usernameParam);
  console.log("Decoded usernameParam:", decodeURIComponent(usernameParam));
  console.log("Trimmed and Lowercased Comparison:", user.userName.trim().toLowerCase() === decodeURIComponent(usernameParam).trim().toLowerCase());

  useEffect(() => {
    if (user.userName.trim().toLowerCase() !== decodeURIComponent(usernameParam).trim().toLowerCase()) {
      router.replace(`/profile/${encodeURIComponent(user.userName)}`);
    }
  }, [user.userName, usernameParam, router]);

  // Ensure that we have valid values for background and profile images
  const userProfileHeaderData = {
    userName: user.userName,
    background: Array.isArray(user.background) && user.background.length > 0 ? user.background[0] : "/images/default-banner.jpg",
    profile: Array.isArray(user.profile) && user.profile.length > 0 ? user.profile[0] : '/images/default-profile.jpg',
    firstname: user.firstName,
    lastname: user.lastName,
    joinedDate: user.createdAt,
  };

  console.log("Using profile picture URL:", userProfileHeaderData.profile);

  return (
    <>
      <UserProfileHeader user={ user } />
      <ListedProperties/>
    </>
  );
};

export default ProfilePageClient;
