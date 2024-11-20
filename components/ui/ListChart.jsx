"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ProfileAPI from "@/lib/api/profile";
import ListingAPI from "@/lib/api/listings";

const chartConfig = {
  credits: {
    label: "Credits",
    color: "#1e40af", // Lila
  },
  amount: {
    label: "Bid Amount",
    color: "#0ea5e9", // Grön
  },
  wins: {
    label: "Wins",
    color: "#d946ef", // Orange
  },
};

export function ListChart({ id }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchChartData() {
      try {
        // Hämta listing med bids
        const listing = await new ListingAPI().listings.read(id);

        // Kontrollera hur bids ser ut
        console.log("Listing Bids:", listing.data.bids);

        // Anta att listing.bids är en array
        const processedData = await Promise.all(
          listing.data.bids.map(async (bid) => {
            const profile = await new ProfileAPI().profile.read(
              bid.bidder.name
            );
            return {
              name: bid.bidder.name, // XAxis värde
              credits: profile.data.credits, // Första stapeln
              wins: profile.data._count.wins, // Tredje stapeln
              amount: bid.amount, // Andra stapeln
            };
          })
        );
        processedData.sort((a, b) => a.amount - b.amount);

        console.log("Sorted Data:", processedData);
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    fetchChartData();
  }, [id]);

  return (
    <ChartContainer config={chartConfig} className="md:h-[550px] min-h-[200px]">
      <BarChart data={chartData} barCategoryGap="15%">
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={2}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          label={{
            value: "Values",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="credits"
          fill={chartConfig.credits.color}
          name={chartConfig.credits.label}
          radius={4}
        />
        <Bar
          dataKey="amount"
          fill={chartConfig.amount.color}
          name={chartConfig.amount.label}
          radius={4}
        />
        <Bar
          dataKey="wins"
          fill={chartConfig.wins.color}
          name={chartConfig.wins.label}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
