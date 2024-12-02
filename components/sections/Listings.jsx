"use client";

import { useState, useEffect } from "react";
import ListingFetcher from "../actions/ListingsFetcher";
import ListingGrid from "../ui/ListingGrid";
import PaginationControls from "../actions/Pagination";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [limit] = useState(21);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1); // State for page number

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get("page")) || 1;
    setPage(pageParam);
  }, []); // This effect runs once, when the component mounts

  // Function to scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      // Update the URL manually
      window.history.pushState(null, "", `?page=${page + 1}`);
      setPage(page + 1); // Update state for page
      scrollToTop(); // Scroll to top when changing page
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      // Update the URL manually
      window.history.pushState(null, "", `?page=${page - 1}`);
      setPage(page - 1); // Update state for page
      scrollToTop(); // Scroll to top when changing page
    }
  };

  return (
    <section className="grid gap-5 mt-10">
      <h1 className="text-5xl px-3 text-center">Listings</h1>
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
    </section>
  );
};

export default Listings;
