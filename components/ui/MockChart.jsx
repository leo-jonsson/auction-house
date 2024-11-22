"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartData = [
  { date: "2024-09-01", sales: 222, listings: 150 },
  { date: "2024-09-02", sales: 97, listings: 180 },
  { date: "2024-09-03", sales: 167, listings: 120 },
  { date: "2024-09-04", sales: 242, listings: 260 },
  { date: "2024-09-05", sales: 373, listings: 290 },
  { date: "2024-09-06", sales: 301, listings: 340 },
  { date: "2024-09-07", sales: 245, listings: 180 },
  { date: "2024-09-08", sales: 409, listings: 320 },
  { date: "2024-09-09", sales: 59, listings: 110 },
  { date: "2024-09-10", sales: 261, listings: 190 },
  { date: "2024-09-11", sales: 327, listings: 350 },
  { date: "2024-09-12", sales: 292, listings: 210 },
  { date: "2024-09-13", sales: 342, listings: 380 },
  { date: "2024-09-14", sales: 137, listings: 220 },
  { date: "2024-09-15", sales: 120, listings: 170 },
  { date: "2024-09-16", sales: 138, listings: 190 },
  { date: "2024-09-17", sales: 446, listings: 360 },
  { date: "2024-09-18", sales: 364, listings: 410 },
  { date: "2024-09-19", sales: 243, listings: 180 },
  { date: "2024-09-20", sales: 89, listings: 150 },
  { date: "2024-09-21", sales: 137, listings: 200 },
  { date: "2024-09-22", sales: 224, listings: 170 },
  { date: "2024-09-23", sales: 138, listings: 230 },
  { date: "2024-09-24", sales: 387, listings: 290 },
  { date: "2024-09-25", sales: 215, listings: 250 },
  { date: "2024-09-26", sales: 75, listings: 130 },
  { date: "2024-09-27", sales: 383, listings: 420 },
  { date: "2024-09-28", sales: 122, listings: 180 },
  { date: "2024-09-29", sales: 315, listings: 240 },
  { date: "2024-09-30", sales: 454, listings: 380 },
  { date: "2024-10-01", sales: 165, listings: 220 },
  { date: "2024-10-02", sales: 293, listings: 310 },
  { date: "2024-10-03", sales: 247, listings: 190 },
  { date: "2024-10-04", sales: 385, listings: 420 },
  { date: "2024-10-05", sales: 481, listings: 390 },
  { date: "2024-10-06", sales: 498, listings: 520 },
  { date: "2024-10-07", sales: 388, listings: 300 },
  { date: "2024-10-08", sales: 149, listings: 210 },
  { date: "2024-10-09", sales: 227, listings: 180 },
  { date: "2024-10-10", sales: 293, listings: 330 },
  { date: "2024-10-11", sales: 335, listings: 270 },
  { date: "2024-10-12", sales: 197, listings: 240 },
  { date: "2024-10-13", sales: 197, listings: 160 },
  { date: "2024-10-14", sales: 448, listings: 490 },
  { date: "2024-10-15", sales: 473, listings: 380 },
  { date: "2024-10-16", sales: 338, listings: 400 },
  { date: "2024-10-17", sales: 499, listings: 420 },
  { date: "2024-10-18", sales: 315, listings: 350 },
  { date: "2024-10-19", sales: 235, listings: 180 },
  { date: "2024-10-20", sales: 177, listings: 230 },
  { date: "2024-10-21", sales: 82, listings: 140 },
  { date: "2024-10-22", sales: 81, listings: 120 },
  { date: "2024-10-23", sales: 252, listings: 290 },
  { date: "2024-10-24", sales: 294, listings: 220 },
  { date: "2024-10-25", sales: 201, listings: 250 },
  { date: "2024-10-26", sales: 213, listings: 170 },
  { date: "2024-10-27", sales: 420, listings: 460 },
  { date: "2024-10-28", sales: 233, listings: 190 },
  { date: "2024-10-29", sales: 78, listings: 130 },
  { date: "2024-10-30", sales: 340, listings: 280 },
  { date: "2024-10-31", sales: 178, listings: 230 },
  { date: "2024-11-01", sales: 178, listings: 200 },
  { date: "2024-11-02", sales: 470, listings: 410 },
  { date: "2024-11-03", sales: 103, listings: 160 },
  { date: "2024-11-04", sales: 439, listings: 380 },
  { date: "2024-11-05", sales: 88, listings: 140 },
  { date: "2024-11-06", sales: 294, listings: 250 },
  { date: "2024-11-07", sales: 323, listings: 370 },
  { date: "2024-11-08", sales: 385, listings: 320 },
  { date: "2024-11-09", sales: 438, listings: 480 },
  { date: "2024-11-10", sales: 155, listings: 200 },
  { date: "2024-11-11", sales: 92, listings: 150 },
  { date: "2024-11-12", sales: 492, listings: 420 },
  { date: "2024-11-13", sales: 81, listings: 130 },
  { date: "2024-11-14", sales: 426, listings: 380 },
  { date: "2024-11-15", sales: 307, listings: 350 },
  { date: "2024-11-16", sales: 371, listings: 310 },
  { date: "2024-11-17", sales: 475, listings: 520 },
  { date: "2024-11-18", sales: 107, listings: 170 },
  { date: "2024-11-19", sales: 341, listings: 290 },
  { date: "2024-11-20", sales: 408, listings: 450 },
  { date: "2024-11-21", sales: 169, listings: 210 },
  { date: "2024-11-22", sales: 317, listings: 270 },
  { date: "2024-11-23", sales: 480, listings: 530 },
  { date: "2024-11-24", sales: 132, listings: 180 },
  { date: "2024-11-25", sales: 141, listings: 190 },
  { date: "2024-11-26", sales: 434, listings: 380 },
  { date: "2024-11-27", sales: 448, listings: 490 },
  { date: "2024-11-28", sales: 149, listings: 200 },
  { date: "2024-11-29", sales: 103, listings: 160 },
  { date: "2024-11-30", sales: 446, listings: 400 },
];

const chartConfig = {
  views: {
    label: "in total",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  listings: {
    label: "Listings",
    color: "hsl(var(--chart-2))",
  },
};

export function MockChart() {
  const [activeChart, setActiveChart] = React.useState("sales");

  const total = React.useMemo(
    () => ({
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
      listings: chartData.reduce((acc, curr) => acc + curr.listings, 0),
    }),
    []
  );

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>AUCSOME statistics</CardTitle>
          <CardDescription>
            <span className="flex gap-1 items-center">
              Showing total sales made vs listings for the last 3 months
              <TrendingUp className="size-4 md:block hidden" />
            </span>
          </CardDescription>
        </div>
        <div className="flex">
          {["sales", "listings"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
