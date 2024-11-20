"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart"; // Assuming ShadCN Chart is set up

const ProfileChart = ({ listings }) => {
  // Aggregate wins and listings
  const totalWins = listings.reduce((sum, item) => sum + item._count.wins, 0);
  const totalListings = listings.reduce(
    (sum, item) => sum + item._count.listings,
    0
  );

  // Prepare chart data
  const chartData = {
    labels: ["Wins", "Listings"], // Categories
    datasets: [
      {
        label: "Count",
        data: [totalWins, totalListings], // Total wins and listings
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(59, 130, 246, 0.8)"], // Green and Blue
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // No legend needed for this simple chart
      },
      title: {
        display: true,
        text: "Wins vs Listings",
      },
    },
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Wins vs Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default ProfileChart;
