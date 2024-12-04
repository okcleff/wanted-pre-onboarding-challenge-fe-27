import { useState, useEffect } from "react";
import useSearchParams from "./useSearchParams";
// import { useSearchParams } from "react-router-dom";

import { createQueryString, validateQueryValues } from "../utils";
import type { TQueryValue, TQueryValidator } from "../types/index";

export interface IUseQueryString<T extends Record<string, TQueryValue>> {
  initialQueries: T;
  queryValidator?: TQueryValidator<T>; // 필터값에 대한 유효성 검증 로직
}

/**
 * 주어진 query와 URLSearchParams를 동기화하고 관리하는 커스텀 훅입니다.
 *
 * @template T - 쿼리 객체의 타입 (Record<string, TQueryValue>를 확장)
 * @param {T} [params.initialQueries] - default query value
 * @param {TQueryValidator<T>} [params.queryValidator] - query value의 유효성을 검사하는 함수 (선택적)
 * @returns {{
 *   queries: T,
 *   setQueries: React.Dispatch<React.SetStateAction<T>>
 * }} 현재 query와 setQuery 함수
 *
 * @example
 * const { queries, setQueries } = useQueryString({
 *   initialQueries: { page: '1', sort: 'desc' },
 *   queryValidator: (key, value) => validateQueryValue(key, value)
 * });
 */
const useQueryString = <T extends Record<string, TQueryValue>>({
  initialQueries,
  queryValidator = (_, value) => value as T[keyof T],
}: IUseQueryString<T>): {
  queries: T;
  setQueries: React.Dispatch<React.SetStateAction<T>>;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [queries, setQueries] = useState<T>(() =>
    // searchParams를 검증하여 초기 쿼리값 설정
    validateQueryValues(initialQueries, searchParams, queryValidator)
  );

  // queries 변경시 URL 업데이트
  useEffect(() => {
    const queryString = createQueryString(queries);
    setSearchParams(queryString);
  }, [queries, setSearchParams]);

  return {
    queries,
    setQueries,
  };
};

export default useQueryString;
