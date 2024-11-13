import React from "react";
import { Button } from "../ui/button";
import ProfileAPI from "@/lib/api/profile";
import { MdLogout } from "react-icons/md";

const SignOutBtn = () => {
  const api = new ProfileAPI();
  return (
    <Button
      onClick={async () => {
        await api.profile.signOut();
      }}
    >
      <MdLogout />
      Sign out
    </Button>
  );
};

export default SignOutBtn;
