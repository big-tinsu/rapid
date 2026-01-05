export function formatDateAndTime(dateString: string | Date): string {
  const date = new Date(dateString);

  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    date
  );

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return `${day} ${month}, ${year} at ${time}`;
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const nth = function (d: any) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function formatShortDate(ISO: string | Date) {
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ISO));

  const suffix = nth(newDate.split(" ")[0]);

  return `${newDate.split(" ")[0]}${suffix} ${newDate.split(" ")[1]} ${
    newDate.split(" ")[2]
  }`;
}

export function hyphenatedShortDate(date: string | Date) {
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return `${
    +newDate.split(" ")[0] < 10
      ? +"0" + newDate.split(" ")[0]
      : newDate.split(" ")[0]
  }-${newDate.split(" ")[1]}-${newDate.split(" ")[2].slice(-2)}`;
}

export function dateWithSlash(date: string | Date) {
  if (!date) return " - ";
  const newDate = new Intl.DateTimeFormat("en-us").format(new Date(date));

  return newDate;
}

export function formattedTime(date: string | Date) {
  const newDate = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

  return newDate;
}

export function calculateDaysLeft(timestamp: string | Date): number {
  // Parse the timestamp into a Date object
  const targetDate = new Date(timestamp);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffMs = targetDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Return the number of days left
  return diffDays;
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const time = new Date(date).getTime();
  const secondsAgo = Math.floor((now.getTime() - time) / 1000);

  let interval = Math.floor(secondsAgo / 31536000); // seconds in a year
  if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(secondsAgo / 2592000); // seconds in a month
  if (interval >= 1) return `${interval} month${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(secondsAgo / 86400); // seconds in a day
  if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(secondsAgo / 3600); // seconds in an hour
  if (interval >= 1) return `${interval} hour${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(secondsAgo / 60); // seconds in a minute
  if (interval >= 1)
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;

  return "just now";
}

export function convertHoursToISODate(hours: number): string {
  // Get the current date and time
  const now = new Date();

  // Set the hours
  now.setHours(now.getHours() + hours);

  // Return the ISO string
  return now.toISOString();
}
