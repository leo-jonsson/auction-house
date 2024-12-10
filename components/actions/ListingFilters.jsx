import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ListingFilters = ({
  sortOrder,
  setSortOrder,
  sort,
  setSort,
  active,
  setActive,
}) => {
  // Handle value changes directly from the Select component
  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleActiveChange = (checked) => {
    setActive(checked); // checked is directly passed by Switch
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg mx-auto">
      {/* Sort Selector */}
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className="max-w-[20rem] w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="created">Date - Created</SelectItem>
            <SelectItem value="endsAt">Date - Deadline</SelectItem>
            <SelectItem value="title">Title - A-Z</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className="mr-auto md:mx-auto"
        variant="ghost"
        onClick={() => {
          {
            sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
          }
        }}
      >
        <span>Sort order</span>
        <span className="flex items-center">
          <FaArrowUp
            className={`${sortOrder === "asc" ? "text-foreground" : "text-muted-foreground/80"} -translate-y-0.5`}
          />
          <FaArrowDown
            className={`${sortOrder === "asc" ? "text-muted-foreground/80" : "text-foreground"} translate-y-0.5`}
          />
        </span>
      </Button>

      {/* toggle between active true and false */}
      <div className="flex items-center gap-3">
        <Switch
          checked={active}
          onCheckedChange={handleActiveChange}
          className="ml-2"
        />
        <Label>Available only</Label>
      </div>
    </div>
  );
};

export default ListingFilters;
