import { useState, useEffect } from "react";
import useSearchParams from "./useSearchParams";
// import { useSearchParams } from "react-router-dom";

import { createQueryString, validateQueries } from "../utils";
import type { QueryValue } from "../types/index";

export interface QueryConfig<T extends Record<string, QueryValue>> {
  initialQueries: T;
  checkQueryValidation?: (key: keyof T, value: string) => T[keyof T] | false; // 필터값에 대한 유효성 검증 로직
}

const useQueryString = <T extends Record<string, QueryValue>>({
  initialQueries,
  checkQueryValidation = (_, value) => value as T[keyof T],
}: QueryConfig<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 최초 렌더링 시 URLSearchParams를 기반으로 쿼리스트링 초기화
  const [queries, setQueries] = useState<T>(() =>
    validateQueries(initialQueries, searchParams, checkQueryValidation),
  );

  // searchParams만 의존성으로 받아서 쿼리스트링 동기화
  useEffect(() => {
    const updatedQueries = validateQueries(
      initialQueries,
      searchParams,
      checkQueryValidation,
    );

    // queries와 updatedQueries가 다른 경우에만 업데이트
    if (JSON.stringify(queries) !== JSON.stringify(updatedQueries)) {
      setQueries(updatedQueries);
    }
  }, [searchParams, checkQueryValidation, initialQueries]);

  // queries가 변경될 때만 URL 업데이트
  useEffect(() => {
    const queryString = createQueryString(queries);

    if (queryString !== searchParams.toString()) {
      setSearchParams(queryString);
    }
  }, [queries, setSearchParams]);

  return {
    queries,
    setQueries,
  };
};

export default useQueryString;
