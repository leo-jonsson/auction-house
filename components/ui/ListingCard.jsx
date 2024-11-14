import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const ListingCard = ({ listing }) => {
  // Extract the first image from the listing.media array if it exists
  const mainImage = listing.media?.[0];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <Avatar>
            <AvatarImage
              src={listing.seller.avatar.url}
              alt={listing.seller.name}
            />
            <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{listing.seller.name}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {/* Use main image if available, otherwise fallback to /placeholder.png */}
          <img
            src={mainImage?.url || "/placeholder.png"}
            alt={mainImage?.alt || "Listing image"}
            className="aspect-[3/4] object-cover rounded-lg"
          />
          <h2>{listing.title}</h2>

          <p>
            {listing.tags.map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
