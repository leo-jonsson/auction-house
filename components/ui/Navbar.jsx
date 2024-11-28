"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { loggedInUser } from "@/lib/utilities/getUser";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import ProfileAPI from "@/lib/api/profile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./sheet";
import {
  FaRegUser,
  FaRegChartBar,
  FaCoins,
  FaPhone,
  FaInfoCircle,
  FaHome,
  FaBars,
  FaPlusCircle,
} from "react-icons/fa";
import ModeToggle from "../theme/ModeToggle";
import SignOutBtn from "../actions/SignOutBtn";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import SearchBar from "../actions/SearchBar";

const Navbar = () => {
  const api = new ProfileAPI();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggedInUser?.name) {
        try {
          setIsLoading(true);
          const profileData = await api.profile.read(loggedInUser.name);
          setUser(profileData.data);
          console.log(profileData.data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
      setIsLoading(false);
    };
    fetchUserProfile();
  }, []);

  const links = user
    ? [
        { name: "Home", href: "/" },
        { name: "Listings", href: "/listings" },
        { name: "Create listing", href: "/listings/post" },
        { name: "Profile", href: `/user/${user?.name}` },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Listings", href: "/listings" },
      ];

  return (
    <nav className="w-full top-0 border-b shadow-sm sm:shadow-none bg-background/70 backdrop-blur-md sticky flex items-center justify-between p-2 z-[50]">
      <div className="flex justify-between max-w-[78rem] w-full mx-auto">
        <span className="flex items-center gap-1">
          <Logo />
          <span className="font-bold">AUCSOME</span>
          <div className="flex items-center gap-5">
            <ul className="flex gap-5 ml-5 text-muted-foreground">
              {links.map((link) => {
                const isActive = pathname === link.href; // Använd pathname som redan hämtats
                return (
                  <li key={link.name} className="sm:flex hidden">
                    <Link
                      href={link.href}
                      className={`transition-colors ${
                        isActive ? "text-foreground" : "hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </span>

        <div className="flex items-center gap-5">
          {isLoading ? (
            <Skeleton className="w-9 aspect-square rounded-full" />
          ) : user ? (
            <div>
              <div className="sm:flex gap-2 items-center hidden">
                <SearchBar />
                <Avatar className="size-8">
                  <AvatarImage
                    src={user.avatar?.url}
                    alt={user.avatar?.alt || "User avatar"}
                  />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <ModeToggle />
              </div>
              <div className="sm:hidden block">
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
                          <SheetClose asChild>
                            <Link
                              href={`/user/${user.name}`}
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaRegUser /> Profile
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaRegChartBar /> My Biddings
                            </Link>
                          </SheetClose>
                        </li>

                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaHome />
                              Home
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/about"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaInfoCircle />
                              About
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/contact"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaPhone />
                              Contact
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/listings/post"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaPlusCircle />
                              Create listing
                            </Link>
                          </SheetClose>
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
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <SearchBar />
              <Link
                href="/auth/login"
                className="px-4 py-1 bg-background text-foreground border hover:bg-muted transition-colors rounded-lg sm:flex hidden"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-1 bg-primary text-white rounded-lg sm:flex hidden"
              >
                Sign up
              </Link>
              <span className="sm:flex hidden">
                <ModeToggle />
              </span>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="icon" className="sm:hidden flex">
                    <FaBars />
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between">
                  <div className="grid gap-5">
                    <SheetHeader>
                      <SheetTitle>
                        <span className="flex items-center gap-2">Menu</span>
                      </SheetTitle>
                    </SheetHeader>
                    <ul className="text-muted-foreground grid gap-3">
                      <li>
                        <SheetClose asChild>
                          <Link href="/">Home</Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link href="/listings">Listings</Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link href="/contact">Contact</Link>
                        </SheetClose>
                      </li>
                    </ul>
                  </div>
                  <div className="flex">
                    <span className="mr-auto">
                      <Link
                        href="/auth/login"
                        className="px-4 py-1 bg-primary text-white rounded-full sm:hidden flex"
                      >
                        Login
                      </Link>
                    </span>
                    <span className="ml-auto">
                      <ModeToggle />
                    </span>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
