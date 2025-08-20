/**
 * Extracts the first character of the first two words in a string.
 * @param fullName - The full name or string to process.
 * @returns A string containing the first characters of the first two words, or an empty string if input is invalid.
 */
export const getInitials = (fullName: string): string => {
  // Trim and split the name into words
  const words = fullName.trim().split(/\s+/);

  let initials = "";

  if (words.length >= 2) {
    // Get the first character of the first two words
    initials = words[0][0].toUpperCase() + words[1][0].toUpperCase();
  } else if (words.length === 1) {
    // If only one word is present, take the first two characters (pad if needed)
    initials = words[0].substring(0, 2).toUpperCase();
  }

  return initials;
};
