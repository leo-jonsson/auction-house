"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { highestBid } from "@/lib/utilities/highestBid";
import { FaCoins } from "react-icons/fa";

const CountBtn = ({ target }) => {
  const initialBid = highestBid(target?.bids || []); // Fallback to an empty array if bids are undefined
  const [currentBid, setCurrentBid] = useState(initialBid);

  const handleIncrement = () => {
    setCurrentBid((prev) => prev + 1); // Increase bid by 1
  };

  const handleDecrement = () => {
    if (currentBid > initialBid) {
      setCurrentBid((prev) => prev - 1); // Decrease bid by 1
    }
  };

  return (
    <div className="flex items-center gap-2 mx-auto w-full">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={currentBid <= initialBid} // Disable if current bid is less than or equal to the initial value
      >
        -
      </Button>
      <span className="relative h-full">
        <Input
          type="text"
          placeholder="Make a bid"
          value={currentBid}
          readOnly // Prevent manual editing
        />
        <FaCoins className="absolute right-2 top-3" />
      </span>
      <Button variant="outline" size="icon" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
};

export default CountBtn;
