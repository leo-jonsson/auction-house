import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { timeUntil } from "@/lib/utilities/date.jsx";
import Bidder from "@/lib/utilities/getBidder";

const ListingCard = ({ listing }) => {
  // Extract the first image from the listing.media array if it exists
  const mainImage = listing.media?.[0];

  return (
    <Card className="relative inview-animate-hide rounded-lg">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={listing.seller.avatar.url}
                alt={listing.seller.name}
              />
              <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{listing.seller.name}</span>
          </div>

          {timeUntil(listing.endsAt)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {/* Use main image if available, otherwise fallback to /placeholder.png */}
          <img
            src={mainImage?.url || "/placeholder.png"}
            alt={mainImage?.alt || "Listing image"}
            className="aspect-[3/4] max-h-[24rem] w-full object-cover rounded-lg"
          />
          <h2>{listing.title}</h2>

          {listing.bids.length > 0 ? (
            <div>
              <Bidder array={listing.bids} />
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">No bids yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
