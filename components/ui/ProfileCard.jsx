"use client";

import React, { useState, useEffect } from "react";
import ProfileAPI from "@/lib/api/profile";
import DotPattern from "./dot-pattern";
import ProfileTable from "./ProfileTable";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { FaCoins, FaList, FaTrophy } from "react-icons/fa";
import GoalPieChart from "./PieChart";
import { MockChart } from "./MockChart";
import HotUsers from "./HotUsers";
import { Skeleton } from "./skeleton";
import { Settings } from "lucide-react";
import { loggedInUser } from "@/lib/utilities/getUser";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import UpdateProfile from "../actions/UpdateProfile";
import Logo from "./Logo";

const ProfilePage = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isExpired = (endsAt) => new Date(endsAt) < new Date();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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

  const handleProfileUpdate = (updatedData) => {
    // Merge the updated data with the current profile state
    setProfile((prevProfile) => ({
      ...prevProfile,
      bio: updatedData.bio,
      avatar: updatedData.avatar,
      banner: updatedData.banner,
    }));

    handleCloseDialog(false);
  };

  if (error) return <div>{error}</div>;
  if (!profile)
    return (
      <div className="absolute inset-0 w-full h-full z-[999]">
        <Skeleton className="w-full h-full flex justify-center items-center">
          <Logo width={120} height={120} className="animate-spin" />
        </Skeleton>
      </div>
    );

  // users that aren't ourselves...
  if (profile.name !== loggedInUser.name)
    return (
      <div className="flex flex-col w-full items-center gap-5 py-4">
        <Card className="max-w-[30rem] w-full relative overflow-hidden pt-0">
          <CardHeader className="relative p-0 overflow-hidden">
            <img
              src={profile.banner.url}
              className="aspect-[4/3] h-[14rem] object-cover"
            />
            <Avatar className="size-24 z-10 border-2  absolute top-1/2 -translate-y-1/2 left-5">
              <AvatarImage
                src={profile?.avatar.url}
                alt={profile?.avatar.alt}
              />
            </Avatar>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-5">
              <div className="grid">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <h2 className="text-muted-foreground">{profile.email}</h2>
              </div>
              {profile.bio ? <p>{profile.bio}</p> : <p>No bio</p>}
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
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
        <div className="md:columns-2 lg:columns-3 gap-2 w-ful px-3 lg:px-0">
          {profile._count.listings > 0 ? (
            profile.listings.map((listing, idx) => (
              <Link href={`/listings/${listing.id}`} key={idx}>
                <Card className="overflow-hidden mb-3 relative">
                  <img
                    src={
                      listing.media[0]
                        ? listing.media[0].url
                        : "/placeholder.png"
                    }
                    alt={listing.media[0]?.alt}
                    className="object-cover w-full h-full"
                  />
                  <span
                    className={`absolute inset-0 bg-destructive/40 ${
                      isExpired(listing.endsAt) ? "flex" : "hidden"
                    }`}
                  >
                    <span className="m-auto text-white font-bold text-2xl bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                      EXPIRED
                    </span>
                  </span>
                </Card>
              </Link>
            ))
          ) : (
            <span>No world</span>
          )}
        </div>
      </div>
    );

  // my profile
  return (
    <div className="pb-10">
      <DotPattern className="-z-10 fixed inset-0 w-full h-full sm:[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]" />
      <h1 className="text-5xl font-bold text-center py-10">
        Hey {profile.name}👋
      </h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <Card className="w-full relative overflow-hidden pt-0">
          <CardHeader className="relative p-0 overflow-hidden">
            <img
              src={profile.banner.url}
              className="aspect-[4/3] h-[14rem] object-cover"
            />
            <Avatar className="size-24 z-10 border-2  absolute top-1/2 -translate-y-1/2 left-5">
              <AvatarImage
                src={profile?.avatar.url}
                alt={profile?.avatar.alt}
              />
            </Avatar>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-0 right-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Settings />
                  <span className="sr-only">Edit your profile</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Edit your profile</DialogTitle>
                <UpdateProfile
                  data={profile}
                  onProfileUpdate={handleProfileUpdate}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-5">
              <div className="grid">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <h2 className="text-muted-foreground">{profile.email}</h2>
              </div>
              {profile.bio ? <p>{profile.bio}</p> : <p>No bio</p>}
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
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
