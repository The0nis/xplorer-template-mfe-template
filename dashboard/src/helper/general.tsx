// Get the initials of user names 
export const getInitials = (firstname: string, lastname?: string): string => {
  const firstInitial = firstname.charAt(0).toUpperCase();
  const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

// Format current date 
export function formatCurrentDate(): string {
  const now = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = now.getDate();
  const month = monthsOfYear[now.getMonth()];
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${dayOfWeek}, ${day} ${month}, ${year} ${hours}:${minutes}:${seconds}`;
}

// Filter types
export const FILTER_TYPES = {
  DURATION: "duration",
  RESOLUTION_CASE_TYPE: "resolution_caseType",
  RESOLUTION_CASE_STATUS: "resolution_caseStatus",
} as const;

export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];