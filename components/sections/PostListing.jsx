import React from "react";
import AuctionForm from "../actions/CreateListing";

const PostListing = () => {
  return (
    <section className="min-h-screen flex flex-col gap-2 items-center justify-center w-full max-w-[45rem] mx-auto px-2">
      <h1 className="text-5xl">Create listing</h1>
      <AuctionForm />
    </section>
  );
};

export default PostListing;
