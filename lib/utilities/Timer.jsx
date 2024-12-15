"use client";

import { TimerIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const Timer = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [date]);

  // Helper function to calculate remaining time
  function calculateTimeLeft(targetDate) {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null; // Countdown finished
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // Check if the listing has expired
  if (!timeLeft) {
    return null;
  }

  // Format the time left into a string
  const formattedTime = `${String(timeLeft.hours).padStart(2, "0")}:${String(
    timeLeft.minutes
  ).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;

  return (
    <div className="text-foreground mx-auto flex items-center gap-1">
      <FaClock /> <span>Ends in {formattedTime}</span>
    </div>
  );
};

export default Timer;
