import ListingCard from "../ui/ListingCard";
import { Skeleton } from "../ui/skeleton";
import BlurFade from "./blur-fade";

const ListingGrid = ({ listings, isLoading, limit }) => {
  return (
    <div className="md:columns-2 lg:columns-3 gap-3 px-3">
      {isLoading
        ? Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="size-full aspect-[3/4] mb-4" />
          ))
        : listings.map((listing, idx) => (
            // <BlurFade key={idx} delay={0.4} inView>
            <ListingCard listing={listing} key={idx} />
            // </BlurFade>
          ))}
    </div>
  );
};

export default ListingGrid;
