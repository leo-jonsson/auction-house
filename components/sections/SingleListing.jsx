import ImgSlider from "../ui/ImgSlider";
import BidBtn from "../actions/BidBtn";
import CountBtn from "../actions/CountBtn";
import Bidder from "@/lib/utilities/getBidder";
import { Badge } from "../ui/badge";
import BidForm from "../actions/Bid";

const SingleListing = ({ listing }) => {
  return (
    <section className="grid lg:grid-cols-2 px-3 gap-2 py-2">
      <ImgSlider carouselItems={listing.media} />

      <div className="flex flex-col justify-around text-center pt-4 max-w-full overflow-x-hidden">
        <div className="grid gap-3">
          <h1 className="text-3xl">{listing.title}</h1>
          <h2 className="text-muted-foreground sm:px-24">
            {listing.description}
          </h2>
          <div className="flex gap-3 items-center mx-auto">
            {listing.tags.map((tag, idx) => (
              <Badge variant="outline" key={idx}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-2 mx-auto items-center">
          {listing.bids.length > 0 ? (
            <Bidder array={listing.bids} />
          ) : (
            <p className="text-center">Be the first one to bid</p>
          )}
          <BidForm target={listing} />
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
