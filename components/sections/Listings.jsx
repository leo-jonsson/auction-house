"use client";

import { useState, useRef } from "react";
import ListingFetcher from "../actions/ListingsFetcher";
import ListingGrid from "../ui/ListingGrid";
import PaginationControls from "../actions/Pagination";
import IntersectionObserverComponent from "../actions/Observer";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [limit] = useState(21);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const headingRef = useRef(null);

  const handleNextPage = () => {
    if (page < totalPages) {
      headingRef.current.scrollIntoView({ behavior: "smooth" });
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      headingRef.current.scrollIntoView({ behavior: "smooth" });
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section className="grid gap-3 mt-3">
      <h1 className="text-5xl px-3 text-center" ref={headingRef}>
        Listings
      </h1>
      <ListingFetcher
        limit={limit}
        page={page}
        setListings={setListings}
        setTotalPages={setTotalPages}
        setIsLoading={setIsLoading}
      />
      <ListingGrid listings={listings} isLoading={isLoading} limit={limit} />
      <PaginationControls
        page={page}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
      <IntersectionObserverComponent listings={listings} />
    </section>
  );
};

export default Listings;
