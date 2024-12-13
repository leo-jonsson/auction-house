"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { highestBid } from "@/lib/utilities/highestBid";
import { FaCoins } from "react-icons/fa";
import ProfileAPI from "@/lib/api/profile";
import ListingsAPI from "@/lib/api/listings";
import { loggedInUser } from "@/lib/utilities/getUser";
import { toast } from "sonner";
import { timeSince } from "@/lib/utilities/date";

const BidForm = ({ target }) => {
  const [currentBid, setCurrentBid] = useState(highestBid(target?.bids) + 1);
  const [userCredits, setUserCredits] = useState(null);
  const [mockBid, setMockBid] = useState("");
  const [hasBidded, setHasBidded] = useState(false);
  const initialBid = highestBid(target?.bids);
  const highest = highestBid(target.bids, true);
  const hasExpired = new Date(target?.endsAt) < new Date();
  const api = new ProfileAPI();
  const loggedInUserName = loggedInUser?.name;

  // Fetch the logged-in user's credits
  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const res = await api.profile.read(loggedInUserName);
        setUserCredits(res?.data?.credits || 0);
      } catch (error) {
        console.error("Error fetching user credits:", error);
      }
    };
    fetchUserCredits();
  }, []);

  const handleIncrement = () => {
    setCurrentBid((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (currentBid > initialBid + 1) {
      setCurrentBid((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCurrentBid(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleBlur = () => {
    if (currentBid === "" || currentBid < initialBid + 1) {
      setCurrentBid(initialBid + 1);
    }
  };

  const handleConfirmBid = async () => {
    try {
      const listingAPI = new ListingsAPI();
      await listingAPI.listings.bid(target.id, currentBid);
      toast("Bid has been placed", {
        description: `You've made an offer of ${currentBid} credits.`,
      });
      setMockBid(currentBid);
      setHasBidded(true);
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Failed to place bid.");
    }
  };

  return (
    <div className="w-full grid gap-2">
      {!hasBidded ? (
        target.bids.length > 0 ? (
          <div className="flex flex-col text-start">
            <span className="text-foreground font-bold text-xs">
              {timeSince(highest.created)}
            </span>
            {highest.bidder === loggedInUser?.name ? (
              <span className="text-muted-foreground text-sm">
                You are leading this auction with a bid of {highest.amount}{" "}
                credits.
              </span>
            ) : (
              <span className="text-muted-foreground text-sm">
                {highest.bidder} has placed the highest bid of {highest.amount}{" "}
                credits.
              </span>
            )}
          </div>
        ) : (
          <p className="text-start text-sm text-muted-foreground">
            No bids yet
          </p>
        )
      ) : (
        <span className="text-primary text-sm text-start w-full">
          You just took the lead with {mockBid} credits!
        </span>
      )}
      {!hasExpired && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-start justify-start gap-3 mt-5"
        >
          <div className="flex items-center justify-center sm:w-1/2 w-full">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="custom-radius-1"
              onClick={handleDecrement}
              disabled={currentBid <= initialBid + 1}
            >
              -
            </Button>
            <span className="relative h-full w-full">
              <Input
                type="text"
                className="rounded-none w-full"
                placeholder="Make a bid"
                value={currentBid}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FaCoins className="absolute right-3 top-3" />
            </span>
            <Button
              type="button"
              variant="outline"
              className="custom-radius-2"
              size="icon"
              onClick={handleIncrement}
            >
              +
            </Button>
          </div>

          {userCredits && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="submit"
                  variant={userCredits < currentBid ? "destructive" : "default"}
                  disabled={
                    userCredits < currentBid || currentBid < initialBid + 1
                  }
                  className="sm:w-1/2 w-full"
                >
                  {userCredits < currentBid
                    ? "Insufficient funds"
                    : "Place Bid"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Your Bid</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to place a bid of{" "}
                    <strong>{currentBid}</strong> credits. This action cannot be
                    undone. Placing this bid will leave your current wallet{" "}
                    <br /> balance at{" "}
                    <strong>{userCredits - currentBid} </strong> credits.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmBid}>
                    Confirm Bid
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </form>
      )}
    </div>
  );
};

export default BidForm;
