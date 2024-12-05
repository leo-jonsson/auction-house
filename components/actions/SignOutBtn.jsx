import React from "react";
import { Button } from "../ui/button";
import ProfileAPI from "@/lib/api/profile";
import { MdLogout } from "react-icons/md";

const SignOutBtn = () => {
  const api = new ProfileAPI();
  return (
    <Button
      className="w-full  hover:text-destructive md:border-none hover:bg-background md:rounded-none"
      variant="outline"
      onClick={async () => {
        await api.profile.signOut();
      }}
    >
      <MdLogout className="text-destructive" />
      Sign out
    </Button>
  );
};

export default SignOutBtn;
