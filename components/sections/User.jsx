"use client";

import { useParams } from "next/navigation";
import ProfilePage from "../ui/ProfileCard";

const UserPage = () => {
  const params = useParams();
  const userID = params.id;

  return (
    <section className="min-h-screen">
      <ProfilePage username={userID} />
    </section>
  );
};

export default UserPage;
