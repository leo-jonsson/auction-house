import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "./avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { ScrollArea } from "./scroll-area";
import { timeSince } from "@/lib/utilities/date";
import Link from "next/link";

export default function MultiAvatar({ bids }) {
  // Extract the avatars from the `bids` array
  const avatars = bids.map((bid) => bid.bidder.avatar);

  // Limit to 4 avatars and calculate remaining count
  const visibleAvatars = avatars.slice(0, 4);
  const remainingCount = avatars.length - visibleAvatars.length;

  return (
    <div className="flex flex-col">
      <div className="flex -space-x-3 items-center">
        {visibleAvatars.map((avatar, index) => (
          <Avatar key={index} className="size-8 border">
            <AvatarImage
              src={avatar?.url || "/placeholder.png"} // Handle missing avatar
              alt={avatar?.alt || "User avatar"} // Handle missing alt text
            />
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="z-10 size-7 rounded-full cursor-default"
          >
            +{remainingCount}
          </Button>
        )}
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer font-bold hover:underline">
              Show all {bids.length} bids
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Bidding history</DialogTitle>
            <DialogDescription>
              This is a list of all bids placed on this listing
            </DialogDescription>
            <ScrollArea className="max-h-[15rem]">
              <ul className="grid gap-2">
                {bids
                  .sort((a, b) => new Date(b.created) - new Date(a.created)) // Sort latest to oldest bid
                  .map((bid, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between py-1 border-b"
                    >
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/user/${bid.bidder.name}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Avatar className="size-7">
                            <AvatarImage
                              src={bid.bidder.avatar.url}
                              alt={bid.bidder.avatar.alt}
                            />
                          </Avatar>
                          <span className="max-w-[15ch] truncate">
                            {bid.bidder.name}
                          </span>
                        </Link>
                        <span>-</span>
                        <span>{bid.amount} credits</span>
                      </div>
                      <span className="text-xs font-bold">
                        {timeSince(bid.created)}
                      </span>
                    </li>
                  ))}
              </ul>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
