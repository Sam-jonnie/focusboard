import { useEffect, useState } from "react";

// useState that is saved to localStorage. Reads safely (bad JSON / blocked storage
// falls back to `initial`) and saved data always wins over the sample data.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : initial;
    } catch {
      return initial;
    }
  });

  // Write on every change (add / edit / delete / status update).
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable - app keeps working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
