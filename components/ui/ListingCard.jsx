import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { timeUntil } from "@/lib/utilities/date.jsx";
import Link from "next/link";
import { FaCoins } from "react-icons/fa";
import { highestBid } from "@/lib/utilities/highestBid";

const ListingCard = ({ listing }) => {
  // Extract the first image from the listing.media array if it exists
  const mainImage = listing.media?.[0];

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="relative inview-animate-hide rounded-lg h-full overflow-hidden aspect-[3/4]">
        <div className="absolute top-0 left-0 w-full flex items-center px-2 py-1 justify-between gap-2 z-20 bg-black/50 text-white backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage
                src={listing.seller.avatar.url}
                alt={listing.seller.name}
              />
              <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold max-w-[13ch] truncate overflow-hidden">
              {listing.seller.name.toUpperCase()}
            </span>
          </div>
          <span className="text-foreground">{timeUntil(listing.endsAt)}</span>
        </div>
        <CardHeader className="p-0">
          <img
            src={mainImage?.url || "/placeholder.png"}
            alt={mainImage?.alt || "Listing image"}
            className="w-full object-cover bg-muted h-full absolute inset-0"
          />
        </CardHeader>
        <CardContent className="flex justify-end w-full gap-1 p-2 pt-2 absolute bottom-0">
          <div className="bg-black/50 backdrop-blur-sm text-white rounded-lg p-1 flex justify-center items-center">
            {listing.bids.length > 0 ? (
              <span className="flex items-center gap-2">
                {highestBid(listing.bids)} <FaCoins />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                0 <FaCoins />
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
