"use client";

import { useParams } from "next/navigation";
import ProfilePage from "../ui/ProfileCard";

const UserPage = () => {
  const params = useParams();
  const userID = params.id;
  console.log(userID);

  return (
    <section>
      <ProfilePage username={userID} />
    </section>
  );
};

export default UserPage;
