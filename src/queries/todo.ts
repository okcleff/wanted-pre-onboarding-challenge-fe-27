import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "./axiosInstance";
import { handleAPIError } from "../utils";
import type {
  NewTodo,
  TodoItem,
  CreateTodoResponse,
  UpdateTodoResponse,
} from "../types/todo";
import type { ErrorResponse } from "../types/auth";
import { TODO_LIST_FETCH_QUERY_KEY } from "../constants";

// ---------- 새 할 일 추가 ----------
const postNewTodo = async (todo: NewTodo) => {
  const response = await axiosInstance.post("/todos", todo);
  return response.data;
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  return useMutation<CreateTodoResponse, ErrorResponse, NewTodo>({
    mutationFn: postNewTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      setSearchParams({ id: response.data.id });
      toast.success("할 일이 추가되었습니다.");
    },
    onError: (error) =>
      handleAPIError(error, "할 일을 추가하는데 실패했습니다."),
  });
};
// ---------- 새 할 일 추가 ----------

// ---------- 할 일 목록 조회 ----------
const getTodos = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data.data;
};

export const useGetTodos = () => {
  return useSuspenseQuery<TodoItem[], ErrorResponse>({
    queryKey: TODO_LIST_FETCH_QUERY_KEY,
    queryFn: getTodos,
  });
};
// ---------- 할 일 목록 조회 ----------

// ---------- ID로 할 일 조회 ----------
const getTodoById = async (id: string) => {
  const response = await axiosInstance.get(`/todos/${id}`);
  return response.data.data;
};

export const useGetTodoById = (id: string) => {
  return useSuspenseQuery<TodoItem, ErrorResponse>({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
  });
};
// ---------- ID로 할 일 조회 ----------

// ---------- 할 일 수정 ----------
const updateTodo = async ({ id, title, content }: TodoItem) => {
  const response = await axiosInstance.put(`/todos/${id}`, {
    title: title,
    content: content,
  });
  return response.data;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, ErrorResponse, TodoItem>({
    mutationFn: updateTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: TODO_LIST_FETCH_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: ["todo", response.data.id],
      });
      toast.success("할 일이 수정되었습니다.");
    },
    onError: (error) =>
      handleAPIError(error, "할 일을 수정하는데 실패했습니다."),
  });
};
// ---------- 할 일 수정 ----------

// ---------- 할 일 삭제 ----------
const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, ErrorResponse, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      toast.success("할 일이 삭제되었습니다.");
    },
    onError: (error) =>
      handleAPIError(error, "할 일을 삭제하는데 실패했습니다."),
  });
};
// ---------- 할 일 삭제 ----------
