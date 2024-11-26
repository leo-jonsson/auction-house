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

const BidForm = ({ target }) => {
  const [currentBid, setCurrentBid] = useState(highestBid(target?.bids || []));
  const [userCredits, setUserCredits] = useState(null);
  const initialBid = highestBid(target?.bids);
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
    setCurrentBid((prev) => prev + 1); // Increase bid by 1
  };

  const handleDecrement = () => {
    if (currentBid > initialBid) {
      setCurrentBid((prev) => prev - 1); // Decrease bid by 1
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow empty or numeric values for free editing
    if (value === "" || /^\d+$/.test(value)) {
      setCurrentBid(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleBlur = () => {
    // Reset to initial bid if input is invalid
    if (currentBid === "" || currentBid < initialBid) {
      setCurrentBid(initialBid);
    }
  };

  const handleConfirmBid = async () => {
    try {
      const listingAPI = new ListingsAPI();
      await listingAPI.listings.bid(target.id, currentBid);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid.");
    } finally {
      toast("Bid has been placed", {
        description: `You've made an offer of ${currentBid} credits.`,
      });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <div className="flex items-center mx-auto w-full">
        <Button
          type="button" // Prevent default form submission
          variant="outline"
          size="icon"
          className="custom-radius-1"
          onClick={handleDecrement}
          disabled={currentBid <= initialBid}
        >
          -
        </Button>
        <span className="relative h-full">
          <Input
            type="text"
            className="rounded-none"
            placeholder="Make a bid"
            value={currentBid}
            onChange={handleChange} // Allow manual typing
            onBlur={handleBlur} // Validate and reset on blur
          />
          <FaCoins className="absolute right-3 top-3" />
        </span>
        <Button
          type="button" // Prevent default form submission
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
              disabled={userCredits < currentBid}
              className="mx-auto w-full"
            >
              {userCredits < currentBid ? "Insufficient funds" : "Place Bid"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Your Bid</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to place a bid of <strong>{currentBid}</strong>{" "}
                credits. This action cannot be undone. Placing this bid will
                leave your current wallet <br /> balance at{" "}
                <strong>{userCredits - currentBid} </strong> credits
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
  );
};

export default BidForm;
