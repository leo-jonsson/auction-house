"use client";
import Demo from "@/components/sections/Demo";
import Hero from "@/components/sections/Hero";
import ListingAPI from "@/lib/api/listings";
import { useEffect } from "react";

export default function Home() {
  const api = new ListingAPI();
  useEffect(() => {
    const fetchMock = async () => {
      const data = await api.listings.readAll();
      console.log(data.data);
    };
    fetchMock();
  });

  return (
    <div className="grid items-center justify-items-center">
      <Hero />
      <Demo />
    </div>
  );
}
