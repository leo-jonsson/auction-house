import React from "react";
import ListingCard from "../ui/ListingCard";
import ImgSlider from "../ui/ImgSlider";

const SingleListing = ({ listing }) => {
  // Ensure listing.media is always an array
  const media = Array.isArray(listing?.media) ? listing.media : [];

  return (
    <section className="grid md:grid-cols-2 px-3">
      <ImgSlider carouselItems={listing.media} />

      <div className="flex flex-col text-center pt-4">
        <h1 className="text-3xl">{listing.title}</h1>
        <h2 className="text-muted-foreground">{listing.description}</h2>
      </div>
    </section>
  );
};

export default SingleListing;
