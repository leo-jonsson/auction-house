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
    color: "#6366f1",
  },
  amount: {
    label: "Bid Amount",
    color: "#1e40af",
  },
  wins: {
    label: "Wins",
    color: "#3b82f6",
  },
};

export function ListChart({ id }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchChartData() {
      try {
        // Fetch listings
        const listing = await new ListingAPI().listings.read(id);

        // map the bids on current listing
        const processedData = await Promise.all(
          listing.data.bids.map(async (bid) => {
            const profile = await new ProfileAPI().profile.read(
              bid.bidder.name
            );
            return {
              name: bid.bidder.name, // XAxis
              credits: profile.data.credits,
              wins: profile.data._count.wins,
              amount: bid.amount,
            };
          })
        );
        processedData.sort((a, b) => a.amount - b.amount);
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    fetchChartData();
  }, [id]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <BarChart data={chartData} barCategoryGap="15%">
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={2}
          axisLine={false}
          tickFormatter={(value) =>
            value.length > 4 ? value.slice(0, 3) + "..." : value
          }
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
