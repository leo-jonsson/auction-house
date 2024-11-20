import ImgSlider from "../ui/ImgSlider";
import Bidder from "@/lib/utilities/getBidder";
import { Badge } from "../ui/badge";
import BidForm from "../actions/Bid";
import { loggedInUser } from "@/lib/utilities/getUser";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const SingleListing = ({ listing }) => {
  return (
    <section className="grid md:grid-cols-2 px-3 gap-2 py-2">
      <ImgSlider carouselItems={listing.media} />
      <div className="flex flex-col justify-around text-center items-center pt-4 max-w-full overflow-x-hidden">
        <div className="grid gap-3">
          <Link
            href={`/user/${listing.seller.name}`}
            className="flex items-center gap-2 mx-auto"
          >
            <span>
              Listed by{" "}
              <span className="text-primary">{listing.seller.name}</span>
            </span>
            <Avatar className="size-7">
              <AvatarImage src={listing.seller.avatar.url} />
            </Avatar>
          </Link>
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <h2 className="text-muted-foreground sm:px-12">
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
        <div className="grid gap-2 mx-auto items-center pt-10">
          {listing.bids.length > 0 ? (
            <Bidder array={listing.bids} />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No bids yet
            </p>
          )}
          {listing.seller.name === loggedInUser.name ? (
            <Button>
              Manage <Settings />
            </Button>
          ) : (
            <BidForm target={listing} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
