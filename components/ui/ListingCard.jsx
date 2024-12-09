import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { timeUntil } from "@/lib/utilities/date.jsx";
import Link from "next/link";
import { FaCoins } from "react-icons/fa";
import { highestBid } from "@/lib/utilities/highestBid";
import { motion, inView } from "framer-motion";

const ListingCard = ({ listing }) => {
  const mainImage = listing.media?.[0];

  return (
    <Link href={`/listings/${listing.id}`}>
      <motion.div
        initial={{ opacity: 0, translateY: "3rem" }}
        transition={{ duration: 0.3 }}
        whileInView={{
          translateY: 0,
          opacity: 1,
        }}
        className="relative rounded-lg h-auto overflow-hidden mb-3 min-h-[10rem] group"
      >
        <Card className="relative">
          <CardHeader className="p-0">
            <img
              src={mainImage?.url || "/placeholder.png"}
              alt={mainImage?.alt || "Listing image"}
              className="w-full h-full inset-0 min-h-[10rem] rounded-lg"
            />
          </CardHeader>

          {/* Overlay shown on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-between items-center rounded-lg bg-black/75 text-white p-4 opacity-0 group-hover:opacity-100"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage
                    src={listing.seller.avatar.url}
                    alt={listing.seller.name}
                  />
                  <AvatarFallback>
                    {listing.seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold max-w-[13ch] truncate overflow-hidden">
                  {listing.seller.name.toUpperCase()}
                </span>
              </div>
              <span className="text-foreground text-sm">
                {timeUntil(listing.endsAt)}
              </span>
            </div>
            <div className="flex w-full justify-end">
              <p className="sr-only">{listing.title}</p>
              <div>
                {listing.bids.length > 0 ? (
                  <span className="flex items-center justify-end gap-2 text-lg font-semibold">
                    {highestBid(listing.bids)} <FaCoins />
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-lg font-semibold">
                    0 <FaCoins />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ListingCard;
