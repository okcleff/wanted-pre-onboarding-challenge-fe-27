import { AUTH_ERROR_STATUS } from "../constants";
import { toast } from "react-toastify";

import { localStorageAuthInstance } from "./auth";
import type { QueryValue } from "../types/index";
import type { ErrorResponse } from "../types/auth";

export const handleAPIError = <T extends ErrorResponse>(
  error: T,
  customErrorMessage: string = "에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
) => {
  console.error("ERROR", error);

  // 사전에 정의된 인증 관련 에러 상태 코드가 있는지 확인
  const definedAuthError = AUTH_ERROR_STATUS.find(
    (item) => item.status === error.response?.status,
  );

  // 인증 관련 에러가 발생했을 경우 토스트 메시지를 표시하고 로컬 스토리지의 토큰을 삭제한 후 로그인 페이지로 이동
  if (definedAuthError) {
    return toast.error(definedAuthError.message, {
      autoClose: 1000,
      onClose: () => {
        localStorageAuthInstance.remove();
        window.location.href = "/auth/signin";
      },
    });
  }

  // 백엔드에서 정의한 에러 메시지가 없을 경우 커스텀 에러 메시지를 표시
  toast.error(error.response?.data.details || customErrorMessage);
};

export const createQueryString = <T extends Record<string, QueryValue>>(
  params: T,
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const initializeQueries = <T extends Record<string, QueryValue>>(
  initialQueries: T,
  searchParams: URLSearchParams,
  sanitizeQueries: (key: keyof T, value: string) => T[keyof T] | undefined,
): T => {
  const queries = { ...initialQueries };

  (Object.keys(queries) as Array<keyof T>).forEach((key) => {
    const value = searchParams.get(String(key));
    if (value) {
      const sanitizedValue = sanitizeQueries(key, value);
      if (sanitizedValue !== undefined) {
        queries[key] = sanitizedValue;
      }
    }
  });

  return queries;
};
