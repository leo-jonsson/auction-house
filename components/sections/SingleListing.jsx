import ImgSlider from "../ui/ImgSlider";
import Bidder from "@/lib/utilities/getBidder";
import { Badge } from "../ui/badge";
import BidForm from "../actions/Bid";
import { loggedInUser } from "@/lib/utilities/getUser";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ListChart } from "../ui/ListChart";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { highestBid } from "@/lib/utilities/highestBid";

const SingleListing = ({ listing }) => {
  const highest = highestBid(listing.bids, true);
  return (
    <section className="grid gap-5 w-full">
      <div className="grid md:grid-cols-2 px-3 gap-2 py-2 relative items-center">
        <div className="grid inview-animate-hide">
          <ImgSlider carouselItems={listing.media} />
        </div>
        <div className="flex flex-col text-center items-center pt-4 w-full overflow-x-hidden inview-animate-hide">
          <div className="grid gap-3">
            <Link
              href={`${
                loggedInUser ? `/user/${listing.seller.name}` : "/auth/register"
              }`}
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
          <div className="flex flex-col justify-center items-center gap-2 pt-5">
            {listing.bids.length > 0 ? (
              <span className="text-muted-foreground text-sm">
                {highest.bidder} has offered {highest.amount} credits
              </span>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No bids yet
              </p>
            )}

            {loggedInUser ? (
              // Show BidForm if user is logged in
              listing.seller.name === loggedInUser?.name ? (
                <Button>
                  Manage <Settings />
                </Button>
              ) : (
                <BidForm target={listing} />
              )
            ) : (
              // Show sign-up prompt if no user is logged in
              <p className="text-center text-base text-foreground">
                Create an account to bid on this product!{" "}
                <Link href="/auth/register" className="text-primary">
                  Sign up
                </Link>
              </p>
            )}
            {loggedInUser && listing.bids.length > 1 ? (
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Analyze your bidding opponents</CardTitle>
                </CardHeader>
                <ListChart id={listing.id} />
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleListing;
