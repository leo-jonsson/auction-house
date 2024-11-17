"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ListingAPI from "@/lib/api/listings";
import SingleListing from "@/components/sections/SingleListing";

const SingleListingPage = () => {
  const params = useParams();
  const listingId = params.id;
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await new ListingAPI().listings.read(listingId);
        setPost(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [listingId]);
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center">
      <SingleListing listing={post} />
    </div>
  );
};

export default SingleListingPage;
