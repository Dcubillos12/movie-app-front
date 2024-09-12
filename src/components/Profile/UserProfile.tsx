"use client";
import UserProfileType from "@/app/types/profile";
import { useEffect, useState } from "react";

async function fetchUserProfile(): Promise<UserProfileType> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(
    "https://nest-postgres-blpc.onrender.com/auth/profile",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to parse user profile data");
  }
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchUserProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
};

export default UserProfile;
