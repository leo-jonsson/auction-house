"use client";

import ListingAPI from "@/lib/api/listings";
import { useState, useEffect } from "react";
import ListingCard from "../ui/ListingCard";

const Listings = () => {
  const api = new ListingAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        // Pass page and limit directly as arguments, not as an object
        const data = await api.listings.readAll(page, limit);
        setListings((prevListings) => [...prevListings, ...data.data]);
        console.log(data.data);
        setTotalPages(data.meta.pageCount); // Assuming pageCount is in data.meta
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [page, limit]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {listings.map((listing, idx) => (
        <ListingCard key={idx} listing={listing} />
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Listings;
