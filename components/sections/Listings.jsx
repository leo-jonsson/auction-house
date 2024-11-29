"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ListingFetcher from "../actions/ListingsFetcher";
import ListingGrid from "../ui/ListingGrid";
import PaginationControls from "../actions/Pagination";
import IntersectionObserverComponent from "../actions/Observer";

const Listings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [limit] = useState(21);
  const [totalPages, setTotalPages] = useState(1);

  // Get the page number from URL or default to 1
  const page = parseInt(searchParams.get("page")) || 1;

  const handleNextPage = () => {
    if (page < totalPages) {
      router.push(`?page=${page + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}`);
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
      <IntersectionObserverComponent listings={listings} />
    </section>
  );
};

export default Listings;
