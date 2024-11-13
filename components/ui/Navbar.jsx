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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

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
    <nav className="w-full top-0 border-b shadow-sm bg-background/70 backdrop-blur-sm sticky flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Logo />
        <ul className="flex items-center gap-3">
          <li>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage
                src={user.avatar?.url}
                alt={user.avatar?.alt || "User avatar"}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>@{user.name}</SheetTitle>
            </SheetHeader>
            <ul>
              <li>Wallet: {user.credits} credits</li>
              <li></li>
            </ul>
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
