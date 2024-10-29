import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { axiosAuthInstance } from "./axiosInstance";
import type {
  NewTodo,
  TodoItem,
  GetTodoResponse,
  CreateTodoResponse,
  UpdateTodoResponse,
  TodoError,
} from "../types/todo";

const TODO_LIST_FETCH_QUERY_KEY = ["todos"];

/**
 * 인증 관련 에러를 처리하는 함수
 * @param {TodoError} error - 발생한 에러 객체
 * @param {string} [customErrorMessage="에러가 발생했습니다. 잠시 후 다시 시도해주세요."] - 커스텀 에러 메시지
 * @returns {void}
 *
 * @description
 * - 401 에러일 경우 로그인 필요 메시지를 표시하고 로그인 페이지로 이동합니다.
 * - 그 외의 경우 서버에서 받은 에러 메시지나 커스텀 에러 메시지를 표시합니다.
 */
const handleTodoError = (
  error: TodoError,
  customErrorMessage: string = "에러가 발생했습니다. 잠시 후 다시 시도해주세요."
) => {
  console.error("todo.ts - ERROR", error);

  // validateToken 함수에서 토큰이 없을 때 401 에러를 반환하도록 했으므로
  if (error.response?.status === 401) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/auth/signin";
  }

  alert(error.response?.data.details || customErrorMessage);
};

// ---------- 새 할 일 추가 ----------
const postNewTodo = async (todo: NewTodo) => {
  const response = await axiosAuthInstance.post("/todos", todo);
  return response.data;
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  return useMutation<CreateTodoResponse, TodoError, NewTodo>({
    mutationFn: postNewTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      setSearchParams({ id: response.data.id });
    },
    onError: (error) =>
      handleTodoError(error, "할 일을 추가하는데 실패했습니다."),
  });
};
// ---------- 새 할 일 추가 ----------

// ---------- 할 일 목록 조회 ----------
const getTodos = async () => {
  const response = await axiosAuthInstance.get("/todos");
  return response.data.data;
};

export const useGetTodos = () => {
  return useSuspenseQuery<GetTodoResponse, TodoError>({
    queryKey: TODO_LIST_FETCH_QUERY_KEY,
    queryFn: getTodos,
  });
};
// ---------- 할 일 목록 조회 ----------

// ---------- ID로 할 일 조회 ----------
const getTodoById = async (id: string) => {
  const response = await axiosAuthInstance.get(`/todos/${id}`);
  return response.data.data;
};

export const useGetTodoById = (id: string) => {
  return useSuspenseQuery<TodoItem, TodoError>({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
  });
};
// ---------- ID로 할 일 조회 ----------

// ---------- 할 일 수정 ----------
const updateTodo = async ({ id, title, content }: TodoItem) => {
  const response = await axiosAuthInstance.put(`/todos/${id}`, {
    title: title,
    content: content,
  });
  return response.data;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, TodoError, TodoItem>({
    mutationFn: updateTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: TODO_LIST_FETCH_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: ["todo", response.data.id],
      });
    },
    onError: (error) =>
      handleTodoError(error, "할 일을 수정하는데 실패했습니다."),
  });
};
// ---------- 할 일 수정 ----------

// ---------- 할 일 삭제 ----------
const deleteTodo = async (id: string) => {
  const response = await axiosAuthInstance.delete(`/todos/${id}`);
  return response.data;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, TodoError, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
    },
    onError: (error) =>
      handleTodoError(error, "할 일을 삭제하는데 실패했습니다."),
  });
};
// ---------- 할 일 삭제 ----------
