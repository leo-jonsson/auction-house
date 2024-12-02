import { FaCoins } from "react-icons/fa";
import { loggedInUser } from "./getUser";

const Bidder = ({ array }) => {
  const bid = array[array.length - 1]; // Last bid

  if (loggedInUser?.name === bid.bidder.name)
    return (
      <p className="text-muted-foreground text-sm">
        You&apos;re currently leading this auction
      </p>
    );

  return (
    <p className="text-muted-foreground text-sm">
      {bid.bidder.name} has offered{" "}
      <span className="text-primary inline-flex items-center gap-1">
        {bid.amount} <FaCoins />
      </span>
    </p>
  );
};

export default Bidder;
