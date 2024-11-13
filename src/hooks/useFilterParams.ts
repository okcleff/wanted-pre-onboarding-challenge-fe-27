import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { createQueryString, initializeFilters } from "../utils";
import type { FilterValue } from "../types/index";

export interface FilterConfig<T extends Record<string, FilterValue>> {
  initialFilters: T;
  sanitizeFilter?: (key: keyof T, value: string) => T[keyof T] | undefined; // 필터값에 대한 유효성 검증 로직
}

export const useFilterParams = <T extends Record<string, FilterValue>>({
  initialFilters,
  sanitizeFilter = (_, value) => value as T[keyof T],
}: FilterConfig<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<T>(() =>
    initializeFilters(initialFilters, searchParams, sanitizeFilter),
  );

  useEffect(() => {
    setSearchParams(createQueryString(filters));
  }, [filters, setSearchParams]);

  const updateFilter = (key: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    filters,
    setFilters,
    updateFilter,
  };
};
