/**
 * Converts hours into HH:MM:SS format.
 * @param totalHours - The total number of hours to convert.
 * @returns A formatted string in HH:MM:SS format.
 */
export const formatTime = (totalHours: number): string => {
  const adjustedHours = totalHours * 24;
  const hours = Math.floor(adjustedHours);
  const minutes = Math.floor((adjustedHours % 1) * 60);
  const seconds = Math.round((((adjustedHours % 1) * 60) % 1) * 60);

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats a time string to "HH:MM:SS" format.
 *
 * @param {string} inputTime - The input time string (e.g., "06:51:4.767773799998395").
 * @returns {string} - The formatted time string (e.g., "06:51:04").
 */
export const removeMilliseconds = (inputTime: string) => {
  try {
    if (typeof inputTime !== "string") return "00:00:00";

    const parts = inputTime.split(":");
    if (parts.length < 3) return "00:00:00"; // Unexpected format

    // Ensure hours and minutes are two digits
    const hours = parts[0].padStart(2, "0");
    const minutes = parts[1].padStart(2, "0");

    // Extract seconds (removing any decimals)
    const seconds = parts[2].split(".")[0].padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  } catch (error) {
    // On any error, return the default value
    return "00:00:00";
  }
};

/**
 * Converts an SLA countdown string to "TotalHours:MM:SS" format.
 *
 * @param {string} inputTime - The input SLA time string (e.g., "1.04:17:02.4215316").
 * @returns {string} - The formatted time string (e.g., "28:17:02").
 */
export const formatSLACountdown = (inputTime: string): string => {
  try {
    if (typeof inputTime !== "string") return "00:00:00";

    const parts = inputTime.split(":");
    if (parts.length < 3) return "00:00:00"; // Invalid format

    // Extract parts: "1.04" (day & hour), "17", "02.4215316" (minutes & seconds)
    const [dayHour, minutes, secondsWithMs] = parts;

    // Split day and hour ("1.04" → day = 1, hour = 04)
    const [days, hours] = dayHour.includes(".") ? dayHour.split(".").map(Number) : [0, Number(dayHour)];

    // Convert to total hours
    const totalHours = days * 24 + hours;
    
    // Parse minutes and seconds (remove milliseconds)
    const minutesFormatted = minutes.padStart(2, "0");
    const seconds = secondsWithMs.split(".")[0].padStart(2, "0");

    return `${totalHours}:${minutesFormatted}:${seconds}`;
  } catch (error) {
    return "00:00:00"; // Fallback on error
  }
};

/**
 * Converts a date string or Date object to GMT+1 and formats as "DD/MM/YYYY HH:MM:SS".
 * @param inputDate - The input date (string or Date).
 * @returns Formatted date string in GMT+1.
 */
export const formatToGMTPlus1 = (inputDate: string | Date): string => {
  if (!inputDate) return "";
  const date = typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  if (isNaN(date.getTime())) return "";

  // Add 1 hour to UTC time
  const gmtPlus1Date = new Date(date.getTime() + 60 * 60 * 1000);

  const day = String(gmtPlus1Date.getUTCDate()).padStart(2, "0");
  const month = String(gmtPlus1Date.getUTCMonth() + 1).padStart(2, "0");
  const year = gmtPlus1Date.getUTCFullYear();
  const hours = String(gmtPlus1Date.getUTCHours()).padStart(2, "0");
  const minutes = String(gmtPlus1Date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(gmtPlus1Date.getUTCSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
