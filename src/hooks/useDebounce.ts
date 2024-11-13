import { useEffect, useState } from "react";

import { DEBOUNCE_DEFAULT_DELAY } from "../constants";

export const useDebounce = <T>(value: T, delay = DEBOUNCE_DEFAULT_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
