import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import useHandleParams from "../hooks/useHandleParams";
import { apiRequest } from "./axiosInstance";
import { handleAPIError, createQueryString } from "../utils";
import type {
  NewTodo,
  TodoItem,
  TodoListResponse,
  TodoItemResponse,
  DeleteTodoResponse,
  TodoPriority,
  TodoFilters,
} from "../types/todo";
import type { ErrorResponse } from "../types/auth";
import { TODO_LIST_FETCH_QUERY_KEY } from "../constants";

// ---------- 새 할 일 추가 ----------
const postNewTodo = async (todo: NewTodo) => {
  return apiRequest.post<TodoItemResponse, NewTodo>("/todos", todo);
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();
  const { setSelectedParam: setSelectedTodoId } = useHandleParams("id");

  return useMutation<TodoItemResponse, ErrorResponse, NewTodo>({
    mutationFn: postNewTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      setSelectedTodoId(response.data.id);
      toast.success("할 일이 추가되었습니다.");
    },
    onError: (error) =>
      handleAPIError(error, "할 일을 추가하는데 실패했습니다."),
  });
};
// ---------- 새 할 일 추가 ----------

// ---------- 할 일 목록 조회 ----------
const getTodos = async (filters: TodoFilters = {}) => {
  const queryString = createQueryString(filters);
  return apiRequest.get<TodoListResponse>(`/todos${queryString}`);
};

export const useGetTodos = (filters: TodoFilters) => {
  return useSuspenseQuery<TodoListResponse, ErrorResponse>({
    queryKey: [...TODO_LIST_FETCH_QUERY_KEY, filters],
    queryFn: () => getTodos(filters),
  });
};
// ---------- 할 일 목록 조회 ----------

// ---------- ID로 할 일 조회 ----------
const getTodoById = async (id: string) => {
  return apiRequest.get<TodoItemResponse>(`/todos/${id}`);
};

export const useGetTodoById = (id: string) => {
  return useSuspenseQuery<TodoItemResponse, ErrorResponse>({
    queryKey: [...TODO_LIST_FETCH_QUERY_KEY, id],
    queryFn: () => getTodoById(id),
  });
};
// ---------- ID로 할 일 조회 ----------

// ---------- 할 일 수정 ----------
const updateTodo = async ({ id, title, content, priority }: TodoItem) => {
  return apiRequest.put<
    TodoItemResponse,
    { title: string; content: string; priority: TodoPriority }
  >(`/todos/${id}`, {
    title,
    content,
    priority,
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<TodoItemResponse, ErrorResponse, TodoItem>({
    mutationFn: updateTodo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: TODO_LIST_FETCH_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: [...TODO_LIST_FETCH_QUERY_KEY, response.data.id],
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
  return apiRequest.delete<DeleteTodoResponse>(`/todos/${id}`);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { selectedParam: selectedTodoId, goToHome } = useHandleParams("id");

  return useMutation<DeleteTodoResponse, ErrorResponse, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      queryClient.removeQueries({
        queryKey: [...TODO_LIST_FETCH_QUERY_KEY, selectedTodoId],
      });

      // 뒤로가기를 눌렀을 때 삭제된 할 일이 보이지 않도록 하기 위해 URL을 초기화
      window.history.replaceState(null, "", "/");
      toast.success("할 일이 삭제되었습니다.");
      goToHome();
    },
    onError: (error) =>
      handleAPIError(error, "할 일을 삭제하는데 실패했습니다."),
  });
};
// ---------- 할 일 삭제 ----------
