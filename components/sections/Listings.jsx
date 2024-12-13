"use client";

import { useState, useEffect } from "react";
import ListingFetcher from "../actions/ListingsFetcher";
import ListingGrid from "../ui/ListingGrid";
import PaginationControls from "../actions/Pagination";
import ListingFilters from "../actions/ListingFilters";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [limit] = useState(21);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // Filter states
  const [sort, setSort] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [active, setActive] = useState(true);

  // Read filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get("page")) || 1;
    const sortParam = params.get("sort") || "created";
    const sortOrderParam = params.get("sortOrder") || "desc";
    const activeParam = params.get("active") === "false" ? false : true;

    setPage(pageParam);
    setSort(sortParam);
    setSortOrder(sortOrderParam);
    setActive(activeParam);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams({
      page,
      sort,
      sortOrder,
      active,
    });
    window.history.pushState(null, "", `?${params.toString()}`);
  }, [page, sort, sortOrder, active]);

  // Function to scroll to top of the window
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      scrollToTop();
    }
  };

  return (
    <section className="grid gap-5 mt-10">
      <h1 className="text-5xl text-center">Listings</h1>
      <ListingFilters
        sort={sort}
        setSort={setSort}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        active={active}
        setActive={setActive}
        setPage={setPage}
      />
      <ListingFetcher
        limit={limit}
        page={page}
        setListings={setListings}
        setTotalPages={setTotalPages}
        setIsLoading={setIsLoading}
        sort={sort}
        sortOrder={sortOrder}
        active={active}
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
