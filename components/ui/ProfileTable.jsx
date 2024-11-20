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
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

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
    <div className="max-w-[50rem] mx-auto">
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

      <Card className="max-w-full mx-auto pb-3">
        <Table>
          <TableCaption>Recent listings.</TableCaption>
          <TableHeader>
            <TableRow className="py-0">
              <TableHead className="max-[500px]:hidden">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id} className="py-0 w-full items-center">
                <TableCell className="py-0 max-[500px]:hidden">
                  {listing.id}
                </TableCell>
                <TableCell className="py-2">{listing.title}</TableCell>
                <TableCell
                  className={`py-0 ${
                    isExpired(listing.endsAt)
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                >
                  {isExpired(listing.endsAt) ? "Expired" : "Active"}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex gap-2 items-center hover:text-primary transition-colors"
                  >
                    Visit
                    <FaExternalLinkAlt />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProfileTable;
