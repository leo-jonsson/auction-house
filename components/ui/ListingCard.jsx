import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { timeUntil } from "@/lib/utilities/date.jsx";
import Bidder from "@/lib/utilities/getBidder";
import { Badge } from "./badge";
import Link from "next/link";

const ListingCard = ({ listing }) => {
  // Extract the first image from the listing.media array if it exists
  const mainImage = listing.media?.[0];

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="relative inview-animate-hide rounded-lg h-full">
        <CardHeader className="py-3 px-5">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={listing.seller.avatar.url}
                  alt={listing.seller.name}
                />
                <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-bold max-w-[13ch] truncate overflow-hidden">
                {listing.seller.name.toUpperCase()}
              </span>
            </div>

            {timeUntil(listing.endsAt)}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between">
          <div className="flex flex-col justify-between gap-2">
            {/* Use main image if available, otherwise fallback to /placeholder.png */}

            {listing.bids.length > 0 ? (
              <div>
                <Bidder array={listing.bids} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No bids yet</p>
            )}
            <h2 className="max-w-[28ch] truncate overflow-hidden">
              {listing.title}
            </h2>
            <img
              src={mainImage?.url || "/placeholder.png"}
              alt={mainImage?.alt || "Listing image"}
              className="aspect-[4/3] w-full object-cover rounded-lg bg-muted"
            />
            <div className="flex gap-2 mt-3">
              {listing.tags.map((tag, idx) => (
                <Badge variant="outline" className="flex" key={idx}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
