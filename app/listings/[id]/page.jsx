"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ListingAPI from "@/lib/api/listings";
import SingleListing from "@/components/sections/SingleListing";
import { Skeleton } from "@/components/ui/skeleton";

const SingleListingPage = () => {
  const params = useParams();
  const listingId = params.id;
  const [post, setPost] = useState(null); // Initialize with `null`
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await new ListingAPI().listings.read(listingId);
        setPost(data.data);
        console.log(data.data.bids); // Logs bids for debugging
        console.log(data.data); // Logs entire listing data
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [listingId]);

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center">
      {isLoading ? (
        <div className="grid md:grid-cols-2 w-full gap-2">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      ) : (
        <SingleListing listing={post} />
      )}
    </div>
  );
};

export default SingleListingPage;
