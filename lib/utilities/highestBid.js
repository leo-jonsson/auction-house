export const highestBid = (arr, seller = false) => {
  if (!arr || arr.length === 0) {
    return 0; // Return 0 if there are no bids
  }

  // Find the highest bid
  const highestBid = arr.reduce(
    (max, bid) => (bid.amount > max.amount ? bid : max),
    arr[0]
  );

  if (seller) {
    // Return an object with amount and bidder's name if seller is true
    return {
      amount: highestBid.amount,
      bidder: highestBid.bidder?.name || "Anonymous", // Handle cases where bidder or name is undefined
      created: highestBid.created,
    };
  }

  // Return only the highest amount if seller is false
  return highestBid.amount;
};
