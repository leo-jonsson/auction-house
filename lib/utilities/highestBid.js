export const highestBid = (arr) => {
  if (!arr || arr.length === 0) {
    return 0; // Return 0 if there are no bids
  }

  // Sort the array based on highest bid
  const sortedArray = [...arr].sort((a, b) => b.amount - a.amount);

  const highest = sortedArray[0].amount;

  return highest;
};
