"use client";

import React, { useState } from "react";
import { Switch } from "./switch";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import Link from "next/link";
import { timeSince } from "@/lib/utilities/date";

const ProfileTable = ({ listings }) => {
  const [showExpired, setShowExpired] = useState(false);

  const isExpired = (endsAt) => new Date(endsAt) < new Date();

  // Check if there are any expired listings
  const hasExpiredListings = listings.some((listing) =>
    isExpired(listing.endsAt)
  );

  const filteredListings = listings.filter((listing) => {
    if (showExpired) {
      return true; // Always include expired listings when the switch is on
    } else {
      return !isExpired(listing.endsAt); // Show only active listings if the switch is off
    }
  });

  return (
    <Card className="w-full xl:col-span-2 py-2">
      <div className="flex w-full items-start justify-between px-2">
        <p className="text-xl">Your listings</p>
        {/* Only show the switch if there are expired listings */}
        {hasExpiredListings && (
          <div className="flex items-center justify-end mb-4">
            <label htmlFor="showExpired" className="mr-2 text-sm">
              Show Expired
            </label>
            <Switch
              id="showExpired"
              checked={showExpired}
              onClick={() => setShowExpired(!showExpired)}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="mx-auto pb-3 bg-card">
        <ScrollArea className="h-[20rem] w-full">
          {filteredListings.length > 0 ? (
            <div className="grid gap-2 px-2">
              {filteredListings.map((listing, idx) => (
                <div className="relative" key={idx}>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex items-center gap-2 justify-between hover:bg-muted py-2 px-1 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <img
                        src={listing.media[0]?.url || "/placeholder.png"}
                        alt=""
                        className="size-10 rounded-md"
                      />
                      <span>{listing.title}</span>
                    </div>
                    <span>{timeSince(listing.created)}</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">
              No listings
            </p>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ProfileTable;
