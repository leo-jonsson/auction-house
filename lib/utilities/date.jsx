import React from "react";
import { FaClock } from "react-icons/fa";

export function timeSince(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now - postDate; // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs ago`;
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  } else {
    const diffInWeeks = Math.floor(diffInHours / 168);
    return `${diffInWeeks} weeks ago`;
  }
}

export function timeUntil(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = targetDate - now; // Difference in milliseconds
  const diffInMinutes = Math.ceil(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.ceil(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes <= 0) {
    return (
      <span className="bg-destructive px-2 py-1 rounded-md flex items-center gap-1 text-destructive-foreground text-sm">
        <FaClock /> Expired
      </span>
    );
  } else if (diffInMinutes < 60) {
    return (
      <span className="bg-destructive px-2 py-1 rounded-md flex items-center gap-1 text-destructive-foreground text-sm">
        <FaClock /> {diffInMinutes}min
      </span>
    );
  } else if (diffInHours < 24) {
    return (
      <span className="bg-primary text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm">
        <FaClock /> {diffInHours}hrs
      </span>
    );
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.ceil(diffInHours / 24);
    return (
      <span className="bg-primary text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm">
        <FaClock /> {diffInDays}d
      </span>
    );
  } else {
    const diffInWeeks = Math.ceil(diffInHours / 168);
    return (
      <span className="bg-muted px-2 py-1 rounded-md flex items-center gap-1 text-sm">
        <FaClock /> {diffInWeeks}w
      </span>
    );
  }
}
