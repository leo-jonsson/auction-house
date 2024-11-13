"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { loggedInUser } from "@/lib/utilities/getUser"; // Make sure loggedInUser provides the current user's name
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import ProfileAPI from "@/lib/api/profile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import {
  FaRegUser,
  FaRegChartBar,
  FaCoins,
  FaPhone,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";
import ModeToggle from "../theme/ModeToggle";
import SignOutBtn from "../actions/SignOutBtn";

const Navbar = () => {
  const api = new ProfileAPI();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggedInUser?.name) {
        try {
          const profileData = await api.profile.read(loggedInUser.name);
          setUser(profileData.data);
          console.log(profileData.data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <nav className="w-full top-0 border-b shadow-sm bg-background/70 backdrop-blur-sm sticky flex items-center justify-between p-2 sm:mt-5 sm:top-5 sm:border sm:rounded-xl sm:max-w-[50rem] mx-auto">
      <span className="flex items-center gap-1">
        <Logo />
        <span className="text-3xl font-bold">AUCSOME</span>
      </span>

      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user.avatar?.url}
                alt={user.avatar?.alt || "User avatar"}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div className="grid gap-5">
              <SheetHeader>
                <SheetTitle>
                  <span className="flex items-center gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.avatar?.url}
                        alt={user.avatar?.alt || "User avatar"}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <ul className="text-muted-foreground">
                <li className="hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2">
                  <FaCoins /> {user.credits} Credits
                </li>
                <li>
                  <Link
                    href={`/user/${user.name}`}
                    className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                  >
                    <FaRegUser /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                  >
                    <FaRegChartBar /> My Biddings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                  >
                    <FaHome />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                  >
                    <FaInfoCircle />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                  >
                    <FaPhone />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex">
              <span className="mr-auto">
                <SignOutBtn />
              </span>
              <span className="ml-auto">
                <ModeToggle />
              </span>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Register
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
