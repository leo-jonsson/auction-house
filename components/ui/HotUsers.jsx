"use client";

import ProfileAPI from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import { ScrollArea } from "./scroll-area";
import Link from "next/link";

const HotUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await new ProfileAPI().profile.readAll();
        const data = res.data.sort(
          (a, b) => b.listings.length - a.listings.length
        );
        const sortedData = data.slice(0, 20);
        setUsers(sortedData);
        console.log(data); // Log the fetched users immediately
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []); // No need to add `users` in dependencies as `setUsers` updates state

  return (
    <div className="w-full py-2">
      <div className="px-2 text-center pb-5">
        <h2 className="text-2xl font-bold">Hot Users</h2>
        <h3 className="text-muted-foreground text-sm">
          Popular users based on listings
        </h3>
      </div>
      {users.length > 0 ? (
        <ul className="grid grid-cols-3 gap-5 px-2">
          {users.map((user, idx) => (
            <Link
              href={`/user/${user.name}`}
              key={idx}
              className={`${
                idx > 10 ? "xl:flex hidden" : "flex"
              } border py-1 px-2 w-full flex flex-col items-center gap-2 rounded-lg hover:bg-muted transition-colors`}
            >
              <Avatar className="size-7">
                <AvatarImage src={user?.avatar.url} alt={user?.avatar.alt} />
              </Avatar>
              <span className="text-foreground max-w-[8ch] truncate overflow-hidden">
                {user.name}
              </span>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default HotUsers;
