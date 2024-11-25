"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Switch } from "./switch";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area"; // Ensure you have this component
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { timeSince } from "@/lib/utilities/date";
import { Settings } from "lucide-react";

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
        {/* Wrap the table in a ScrollArea for horizontal scrolling */}
        <ScrollArea className="h-[20rem] w-full">
          {filteredListings &&
            filteredListings.map((listing, idx) => (
              <span key={idx}>
                <div className="flex justify-between items-center w-full border-b p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={listing?.media[0]?.url}
                      alt=""
                      className="w-10 h-10 rounded-lg"
                    />
                    <h5>{listing.title}</h5>{" "}
                    {isExpired(listing.endsAt) ? (
                      <p className="text-destructive">(Expired)</p>
                    ) : (
                      <p className="text-primary">(Active)</p>
                    )}
                  </div>

                  <span className="flex items-center gap-2 bg-card border py-1 px-2 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sm:block hidden">Manage</span> <Settings />
                  </span>
                </div>
              </span>
            ))}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ProfileTable;
