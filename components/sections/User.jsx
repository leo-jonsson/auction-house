"use client";

import { useParams } from "next/navigation";
import ProfilePage from "../ui/ProfileCard";

const UserPage = () => {
  const params = useParams();
  const userID = params.id;

  return (
    <section className="sm:px-0 px-2">
      <ProfilePage username={userID} />
    </section>
  );
};

export default UserPage;
