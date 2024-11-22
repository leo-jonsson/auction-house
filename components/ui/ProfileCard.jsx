"use client";

import React, { useState, useEffect } from "react";
import ProfileAPI from "@/lib/api/profile";
import DotPattern from "./dot-pattern";
import ProfileTable from "./ProfileTable";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { FaCoins, FaList, FaTrophy } from "react-icons/fa";
import GoalPieChart from "./PieChart";
import { MockChart } from "./MockChart";
import HotUsers from "./HotUsers";
import { Skeleton } from "./skeleton";
import { Loader } from "lucide-react";

const ProfilePage = ({ username }) => {
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
  if (!profile)
    return (
      <div className="absolute inset-0 w-full h-full">
        <Skeleton className="w-full h-full flex justify-center items-center">
          <Loader className="animate-spin size-32" />
        </Skeleton>
      </div>
    );

  return (
    <div className="pb-10">
      <DotPattern className="-z-10 fixed inset-0 w-full h-full sm:[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]" />
      <h1 className="text-5xl font-bold text-center py-10">
        Hey {profile.name}👋
      </h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <Card>
          <CardHeader className="flex items-center">
            <Avatar className="size-1/2">
              <AvatarImage
                src={profile?.avatar.url}
                alt={profile?.avatar.alt}
              />
            </Avatar>
            <CardTitle>{profile?.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-muted-foreground">
            {profile.bio ? <p>{profile.bio}</p> : <p>No bio</p>}
          </CardContent>
          <CardFooter className="flex gap-3 items-center justify-center">
            <li className="list-none flex items-center gap-2 bg-muted py-1 px-2 rounded-md">
              {profile._count.wins} <FaTrophy />
            </li>
            <li className="list-none flex items-center gap-2 bg-muted py-1 px-2 rounded-md">
              {profile._count.listings} <FaList />
            </li>
            <li className="list-none flex items-center gap-2 bg-muted py-1 px-2 rounded-md">
              {profile.credits} <FaCoins />
            </li>
          </CardFooter>
        </Card>
        <ProfileTable listings={profile.listings} />
        <Card className="flex flex-col items-center justify-center p-5">
          <CardHeader>
            <CardTitle className="text-muted-foreground grid">
              <span className="text-center text-sm text-primary">@AUCSOME</span>
              <span> Active users today</span>
            </CardTitle>
          </CardHeader>
          <p className="text-5xl">12K +</p>
        </Card>
        <GoalPieChart />
        <Card className="flex flex-col items-center justify-center xl:row-span-2">
          <HotUsers />
        </Card>
        <MockChart />
      </div>
    </div>
  );
};

export default ProfilePage;
