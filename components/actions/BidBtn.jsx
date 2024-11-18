import React from "react";
import { Button } from "../ui/button";
import { loggedInUser } from "@/lib/utilities/getUser";
import ProfileAPI from "@/lib/api/profile";

const BidBtn = ({ price }) => {
  const loggedInUserName = loggedInUser?.name;
  const api = new ProfileAPI();

  let data = null;
  const fetchUser = async () => {
    try {
      data = await api.profile.read(loggedInUserName);
      return data;
    } catch (error) {
      error;
    }
  };
  fetchUser();

  if (data.data.credits < price)
    return (
      <Button disabled variant="destructive">
        Insuficent funds
      </Button>
    );

  return <Button className="mx-auto w-full">Place bid</Button>;
};

export default BidBtn;
