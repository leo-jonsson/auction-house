"use client";

import React, { useState } from "react";
import { Switch } from "./switch";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import Link from "next/link";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import ListingAPI from "@/lib/api/listings";

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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2">
              {filteredListings.map((listing, idx) => (
                <div className="relative" key={idx}>
                  <Link href={`/listings/${listing.id}`}>
                    <img
                      src={listing.media[0]?.url || "/placeholder.png"}
                      alt=""
                      className="w-full h-full aspect-[3/4] object-cover rounded-lg border"
                    />
                  </Link>
                  <Button
                    className={`absolute top-0 right-0 z-20 ${
                      isExpired(listing.endsAt) ? "flex" : "hidden"
                    }`}
                    size="icon"
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await new ListingAPI().listings.delete(listing.id)
                      } catch (error) {
                        throw error
                      } finally {
                        window.location.reload()
                      };
                    }}
                  >
                    <Trash2 />
                    <span className="sr-only">Delete listing</span>
                  </Button>
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
