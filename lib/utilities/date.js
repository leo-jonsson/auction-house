export function timeSince(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now - postDate; // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs`;
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} d`;
  } else {
    const diffInWeeks = Math.floor(diffInHours / 168);
    return `${diffInWeeks} w`;
  }
}

// New function to calculate time until a target date
export function timeUntil(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = targetDate - now; // Difference in milliseconds
  const diffInMinutes = Math.ceil(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.ceil(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes <= 0) {
    return "Expired";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min left`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs left`;
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.ceil(diffInHours / 24);
    return `${diffInDays} d left`;
  } else {
    const diffInWeeks = Math.ceil(diffInHours / 168);
    return `${diffInWeeks} w left`;
  }
}
