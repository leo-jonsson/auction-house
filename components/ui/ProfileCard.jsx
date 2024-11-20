"use client";

import React, { useState, useEffect } from "react";
import ProfileAPI from "@/lib/api/profile";
import ProfileChart from "./ProfileChart";
import ProfileTable from "./ProfileTable";
import { Card } from "./card";

const ProfileCard = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await new ProfileAPI().profile.read(username);
        setProfile(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile");
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Credits: {profile.credits}</p>

      <ProfileTable listings={profile.listings} />
    </div>
  );
};

export default ProfileCard;
