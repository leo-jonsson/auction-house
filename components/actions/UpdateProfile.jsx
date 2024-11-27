"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { loggedInUser } from "@/lib/utilities/getUser";
import ProfileAPI from "@/lib/api/profile";

const UpdateProfile = ({ data }) => {
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");

  useEffect(() => {
    if (data) {
      setBio(data.bio || "");
      setAvatarUrl(data.avatar?.url || "");
      setAvatarAlt(data.avatar?.alt || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
    };

    try {
      await new ProfileAPI().profile.update(loggedInUser.name, updateData);
      toast.success("Profile updated", {
        description: "Your profile has been updated.",
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Update failed", {
        description: "An error occurred. Please try again.",
      });
    } finally {
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        disabled
        name="username"
        value={`@${loggedInUser?.name}`}
        readOnly
      />
      <Label htmlFor="bio">Bio</Label>
      <Input
        type="text"
        id="bio"
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Label htmlFor="avatar-url">Avatar URL</Label>
      <Input
        type="text"
        id="avatar-url"
        name="avatar-url"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <Label htmlFor="avatar-alt">Avatar ALT</Label>
      <Input
        type="text"
        id="avatar-alt"
        name="avatar-alt"
        value={avatarAlt}
        onChange={(e) => setAvatarAlt(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Update
      </Button>
    </form>
  );
};

export default UpdateProfile;
