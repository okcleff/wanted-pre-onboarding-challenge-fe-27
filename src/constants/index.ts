import type { NewTodo } from "../types/todo";

export const TODO_LIST_FETCH_QUERY_KEY = ["todos"];

export const AUTH_ERROR_STATUS = [
  {
    status: 401,
    message: "로그인이 필요합니다. 로그인 페이지로 이동합니다.",
  },
];

export const MIN_PASSWORD_LENGTH = 8;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ACCESS_TOKEN_KEY = "accessToken";

export const TOAST_AUTO_CLOSE_TIME = 2000;

export const AUTH_INPUT_DEFAULT_VALUE = {
  email: "",
  password: "",
};

export const TODO_INPUT_DEFAULT_VALUE: NewTodo = {
  title: "",
  content: "",
  priority: "normal",
};

export const TODO_PRIORITY_OPTIONS: {
  value: "urgent" | "normal" | "low";
  label: string;
}[] = [
  { value: "urgent", label: "긴급" },
  { value: "normal", label: "보통" },
  { value: "low", label: "낮음" },
];

export const TODO_PRIORITY_LABEL = {
  urgent: {
    label: "긴급",
    color: "text-rose-600 bg-rose-50",
  },
  normal: {
    label: "보통",
    color: "text-amber-600 bg-amber-50",
  },
  low: {
    label: "낮음",
    color: "text-emerald-600 bg-emerald-50",
  },
};

export const TODO_SORT_OPTIONS = [
  { value: "createdAt-desc", label: "최신순" },
  { value: "createdAt-asc", label: "오래된순" },
  { value: "updatedAt-desc", label: "최근 수정순" },
  { value: "updatedAt-asc", label: "과거 수정순" },
];
