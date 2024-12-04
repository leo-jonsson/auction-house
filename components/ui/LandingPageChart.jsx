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

// Mockdata
const mockData = [
  {
    name: "User A",
    credits: 20,
    wins: 7,
    amount: 300,
  },
  {
    name: "User B",
    credits: 300,
    wins: 20,
    amount: 200,
  },
  {
    name: "User C",
    credits: 100,
    wins: 5,
    amount: 400,
  },
  {
    name: "User D",
    credits: 138,
    wins: 10,
    amount: 150,
  },
];

export function LandingPageChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulerad datahämtning
    const fetchData = async () => {
      try {
        // Sortera data efter amount
        const sortedData = [...mockData].sort((a, b) => a.amount - b.amount);
        setChartData(sortedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

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
