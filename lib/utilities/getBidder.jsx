import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Bidder = ({ array }) => {
  const bid = array[array.length - 1]; // Last bid

  return (
    <p className="text-muted-foreground text-sm">
      {bid.bidder.name} has offered{" "}
      <span className="text-primary">{bid.amount} credits</span> for this item
    </p>
  );
};

export default Bidder;
