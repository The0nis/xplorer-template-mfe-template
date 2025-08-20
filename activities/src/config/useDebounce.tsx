import { useEffect, useState } from "react";
import { searchAPiDelay } from "./helpers";

/**
 * Custom hook for debouncing search input values
 * @param searchTerm - The search term to debounce
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns The debounced search term
 */
const useDebounceSearch = (
  searchTerm: string,
  delay: number = searchAPiDelay
): string => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return debouncedValue;
};

export default useDebounceSearch;
