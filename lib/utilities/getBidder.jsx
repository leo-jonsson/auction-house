import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Bidder = ({ array }) => {
  const bid = array[array.length - 1]; // Last bid

  return (
    <p className="text-muted-foreground text-sm italic">
      {bid.bidder.name} has offered {bid.amount} credits for this item
    </p>
  );
};

export default Bidder;
