// ListingFetcher.jsx
import { useEffect } from "react";
import ListingAPI from "@/lib/api/listings";

const ListingFetcher = ({
  limit,
  page,
  setListings,
  setTotalPages,
  setIsLoading,
}) => {
  const api = new ListingAPI();

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

  return null;
};

export default ListingFetcher;
