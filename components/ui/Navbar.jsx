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
  FaThList,
} from "react-icons/fa";
import ModeToggle from "../theme/ModeToggle";
import SignOutBtn from "../actions/SignOutBtn";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import SearchBar from "../actions/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

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
    <nav className="w-full top-0 border-b shadow-sm sm:shadow-none bg-background sticky flex items-center justify-between px-2 py-2 md:py-4 z-[50]">
      <div className="flex justify-between max-w-[78rem] w-full mx-auto md:px-0 px-1">
        <span className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-0.5">
            <Logo width={20} height={20} />
            <span className="font-bold lg:text-xl">AUCSOME</span>
          </Link>
          <div className="flex items-center gap-5">
            <ul className="flex gap-5 ml-5 text-muted-foreground">
              {links.map((link) => {
                const isActive = pathname === link.href; // Använd pathname som redan hämtats
                return (
                  <li key={link.name} className="md:flex hidden">
                    <Link
                      href={link.href}
                      className={`transition-all ${
                        isActive
                          ? "text-foreground font-bold"
                          : "hover:text-foreground"
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
              <div className="md:flex gap-2 md:gap-4 items-center hidden">
                <SearchBar />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="size-8 cursor-pointer">
                      <AvatarImage
                        src={user.avatar?.url}
                        alt={user.avatar?.alt || "User avatar"}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="p-0">
                      <SignOutBtn />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
              </div>
              <div className="md:hidden flex items-center gap-2">
                <SearchBar />
                <Sheet>
                  <SheetTrigger asChild>
                    <Avatar className="cursor-pointer size-8">
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
                              href="/listings"
                              className="hover:bg-muted hover:text-foreground transition-colors w-full  p-2 rounded-lg flex items-center gap-2"
                            >
                              <FaThList />
                              Listings
                            </Link>
                          </SheetClose>
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
                    <div className="flex items-center">
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
                className="px-4 py-1.5 bg-background text-foreground text-sm  border hover:bg-muted transition-colors rounded-lg md:flex hidden"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg md:flex hidden"
              >
                Sign up
              </Link>
              <span className="md:flex hidden">
                <ModeToggle />
              </span>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="icon" className="md:hidden flex">
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
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-auto">
                      <Link
                        href="/auth/login"
                        className="px-4 py-1 bg-primary text-white rounded-lg md:hidden flex"
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
