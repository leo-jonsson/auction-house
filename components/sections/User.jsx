"use client";

import { useParams } from "next/navigation";
import ProfileCard from "../ui/ProfileCard";

const UserPage = () => {
  const params = useParams();
  const userID = params.id;
  console.log(userID);

  return (
    <section>
      <ProfileCard username={userID} />
    </section>
  );
};

export default UserPage;
