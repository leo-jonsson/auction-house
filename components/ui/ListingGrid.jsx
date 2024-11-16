import ListingCard from "../ui/ListingCard";
import { Skeleton } from "../ui/skeleton";

const ListingGrid = ({ listings, isLoading, limit }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 lg:px-0">
      {isLoading
        ? Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="size-full aspect-[3/4]" />
          ))
        : listings.map((listing, idx) => (
            <ListingCard listing={listing} key={idx} />
          ))}
    </div>
  );
};

export default ListingGrid;
