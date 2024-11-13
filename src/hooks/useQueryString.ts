import { useState, useEffect } from "react";
import useSearchParams from "./useSearchParams";
// import { useSearchParams } from "react-router-dom";

import { createQueryString, initializeQueries } from "../utils";
import type { QueryValue } from "../types/index";

export interface QueryConfig<T extends Record<string, QueryValue>> {
  initialQueries: T;
  sanitizeQueries?: (key: keyof T, value: string) => T[keyof T] | undefined; // 필터값에 대한 유효성 검증 로직
}
const useQueryString = <T extends Record<string, QueryValue>>({
  initialQueries,
  sanitizeQueries = (_, value) => value as T[keyof T],
}: QueryConfig<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queries, setQueries] = useState<T>(() =>
    initializeQueries(initialQueries, searchParams, sanitizeQueries),
  );

  useEffect(() => {
    setSearchParams(createQueryString(queries));
  }, [queries, setSearchParams]);

  const updateQuery = (key: keyof T, value: T[keyof T]) => {
    setQueries((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    queries,
    setQueries,
    updateQuery,
  };
};

export default useQueryString;
