import { useState, useEffect, useCallback } from "react";

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParams
    | string
    | Record<string, string>
    | [string, string][]
    | null,
  navigateOptions?: { replace?: boolean },
) => void;

/**
 * Custom hook that replicates the functionality of react-router-dom's useSearchParams
 *
 * @returns [URLSearchParams, Function] - Returns current search params and a setter function
 */
export default function useSearchParams(): [
  URLSearchParams,
  SetURLSearchParams,
] {
  // Initialize from current URL
  const [searchParams, setSearchParamsState] = useState<URLSearchParams>(
    () => new URLSearchParams(window.location.search),
  );

  // Update URL and state
  const setSearchParams: SetURLSearchParams = useCallback(
    (nextInit, navigateOptions = {}) => {
      let newSearchParams: URLSearchParams;

      if (nextInit === null || nextInit === undefined) {
        newSearchParams = new URLSearchParams();
      } else if (nextInit instanceof URLSearchParams) {
        newSearchParams = nextInit;
      } else if (Array.isArray(nextInit)) {
        newSearchParams = new URLSearchParams(nextInit);
      } else if (typeof nextInit === "object") {
        newSearchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(nextInit)) {
          if (value !== null && value !== undefined) {
            newSearchParams.set(key, String(value));
          }
        }
      } else if (typeof nextInit === "string") {
        newSearchParams = new URLSearchParams(nextInit);
      } else {
        newSearchParams = new URLSearchParams();
      }

      // Compare current and new search params to prevent unnecessary updates
      const currentSearch = searchParams.toString();
      const newSearch = newSearchParams.toString();

      if (currentSearch === newSearch) {
        return; // Skip update if nothing changed
      }

      // Update URL
      const newURL = new URL(window.location.href);
      newURL.search = newSearch ? `?${newSearch}` : "";

      if (navigateOptions.replace) {
        window.history.replaceState(null, "", newURL.toString());
      } else {
        window.history.pushState(null, "", newURL.toString());
      }

      setSearchParamsState(newSearchParams);
    },
    [searchParams],
  );

  // Listen to popstate events (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const newSearchParams = new URLSearchParams(window.location.search);
      // Compare current and new search params to prevent unnecessary updates
      if (newSearchParams.toString() !== searchParams.toString()) {
        setSearchParamsState(newSearchParams);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [searchParams]);

  return [searchParams, setSearchParams];
}
