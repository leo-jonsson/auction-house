"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowUpDown, X } from "lucide-react";

export function ListingFilters({
  onSortChange,
  onPriceRangeChange,
  onAvailableOnlyChange,
  onReset,
}) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availableOnly, setAvailableOnly] = useState(false);

  const handlePriceRangeChange = (value) => {
    const newRange = [value[0], value[1]];
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleAvailableOnlyChange = (checked) => {
    setAvailableOnly(checked);
    onAvailableOnlyChange(checked);
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setAvailableOnly(false);
    onReset();
  };

  return (
    <div className="bg-background mb-6 p-4 shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4">
          <Select onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="date-asc">Date: Oldest First</SelectItem>
              <SelectItem value="date-desc">Date: Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-2/5">
          <Label htmlFor="price-range" className="mb-2 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            id="price-range"
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="available-only"
            checked={availableOnly}
            onCheckedChange={handleAvailableOnlyChange}
          />
          <Label htmlFor="available-only">Available Only</Label>
        </div>

        <Button variant="outline" size="icon" onClick={handleReset}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
