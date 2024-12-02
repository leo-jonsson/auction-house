"use client";
import React from "react";
import AuctionForm from "../actions/CreateListing";
import ListingAPI from "@/lib/api/listings";

const PostListing = () => {
  const handleFormSubmit = async (data) => {
    try {
      const response = await new ListingAPI().listings.create(data);
      setTimeout(() => {
        window.location.href = `/listings/${response.data.id}`;
      }, 300);
    } catch (error) {
      console.error("Failed to create listing:", error);
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col gap-2 items-center justify-center w-full max-w-[45rem] mx-auto px-2">
      <h1 className="text-5xl">Create listing</h1>
      <AuctionForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default PostListing;
