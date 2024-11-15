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
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null); // Store observer instance
  const headingRef = useRef(null); // Use ref for scrolling

  const fetchListings = async (currentPage) => {
    setIsLoading(true);
    try {
      const data = await api.listings.readAll(currentPage, limit);

      // Check if an image URL is valid by attempting to load the image
      const checkImageValidity = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(true); // Image loaded successfully
          img.onerror = () => reject(false); // Image failed to load
          img.src = url;
        });
      };

      // Filter out listings with invalid image URLs
      const validListings = await Promise.all(
        data.data.map(async (listing) => {
          const validMedia = await Promise.all(
            listing.media.map(async (mediaItem) => {
              try {
                // Check if the image URL is valid
                const isValid = await checkImageValidity(mediaItem.url);
                return isValid ? mediaItem : null; // Return valid media item or null
              } catch (error) {
                return null; // Invalid image URL
              }
            })
          );

          // Include the listing if it has at least one valid image
          return validMedia.some((valid) => valid !== null) ? listing : null;
        })
      );

      // Remove null listings
      const filteredListings = validListings.filter(
        (listing) => listing !== null
      );

      setListings(filteredListings);
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

  // Utility function to chunk array into 3 parts
  const chunkListings = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const columns = chunkListings(listings, Math.ceil(listings.length / 3));

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
      <h1 className="text-5xl px-3" ref={headingRef}>
        Listings
      </h1>
      <div className="grid grid-cols-3 gap-4 px-3 lg:px-0">
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
              <Skeleton key={index} className="size-full aspect-[3/4]" />
            ))
          : columns.map((column, colIdx) => (
              <div key={colIdx} className="space-y-3">
                {column.map((listing, idx) => (
                  <ListingCard key={idx} listing={listing} />
                ))}
              </div>
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
