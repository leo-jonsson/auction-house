"use client";

import { useState, useEffect, useRef } from "react";
import ListingAPI from "@/lib/api/listings";
import ListingCard from "../ui/ListingCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Listings = () => {
  const api = new ListingAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const observerRef = useRef(null); // Store observer instance

  const fetchListings = async (currentPage) => {
    setIsLoading(true);
    try {
      const data = await api.listings.readAll(currentPage, limit);
      setListings(data.data);
      setTotalPages(data.meta.pageCount || 1);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(page);
  }, [page]);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview-animate-show");
        } else {
          entry.target.classList.remove("inview-animate-show");
        }
      });
    };

    // Lazily initialize the observer
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(observerCallback, {
        threshold: 0.1, // Adjust threshold as needed
      });
    }

    const observer = observerRef.current;
    const hiddenElements = document.querySelectorAll(".inview-animate-hide");
    hiddenElements.forEach((element) => observer.observe(element));

    return () => {
      // Cleanup observer on unmount
      if (observer) {
        hiddenElements.forEach((element) => observer.unobserve(element));
      }
    };
  }, [listings]); // Re-run only when new listings are rendered

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="grid gap-3 mt-3">
      <h1 className="text-5xl px-3">Listings</h1>
      <div className="grid px-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:px-0">
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
              <Skeleton key={index} className="size-full aspect-[3/4]" />
            ))
          : listings.map((listing, idx) => (
              <ListingCard
                key={idx}
                listing={listing}
                className="inview-animate-hide"
              />
            ))}
      </div>

      <div className="flex justify-between items-center my-10 px-3">
        <Button variant="ghost" onClick={handlePrevPage} disabled={page === 1}>
          <ArrowLeft />
          Prev
        </Button>
        <span className="text-muted-foreground">
          <span className="text-foreground"> {page}</span> / {totalPages}
        </span>
        <Button
          variant="ghost"
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          Next
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Listings;
