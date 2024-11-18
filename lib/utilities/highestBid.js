export const highestBid = (arr) => {
  if (!arr || arr.length === 0) {
    return 0; // Return 0 if there are no bids
  }
  const bid = arr[arr.length - 1]; // Last bid
  const highest = bid.amount;
  return highest;
};
