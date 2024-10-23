import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosAuthInstance } from "./axiosInstance";
import {
  NewTodo,
  TodoItem,
  GetTodoResponse,
  CreateTodoResponse,
  UpdateTodoResponse,
  TodoError,
} from "../types/todo";

const TODO_LIST_FETCH_QUERY_KEY = ["todos"];

const handleAuthError = (
  error: TodoError,
  callbackFn: () => void,
  customErrorMessage: string = "에러가 발생했습니다. 잠시 후 다시 시도해주세요."
) => {
  // validateToken 함수에서 토큰이 없을 때 401 에러를 반환하도록 했으므로
  if (error.response.status === 401) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return callbackFn();
  }

  alert(error.response.data.details || customErrorMessage);
};

// ---------- 새 할 일 추가 ----------
const postNewTodo = async (todo: NewTodo) => {
  const response = await axiosAuthInstance.post("/todos", todo);
  return response.data;
};

export const usePostNewTodo = (): UseMutationResult<
  CreateTodoResponse,
  TodoError,
  NewTodo
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<CreateTodoResponse, TodoError, NewTodo>({
    mutationFn: postNewTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      alert("할 일이 추가되었습니다.");
    },
    onError: (error) =>
      handleAuthError(
        error,
        () => navigate("/auth/signin"),
        "할 일을 추가하는데 실패했습니다."
      ),
  });
};
// ---------- 새 할 일 추가 ----------

// ---------- 할 일 목록 조회 ----------
const getTodos = async () => {
  const response = await axiosAuthInstance.get("/todos");
  return response.data.data;
};

export const useGetTodos = () => {
  return useQuery<GetTodoResponse, TodoError>({
    queryKey: TODO_LIST_FETCH_QUERY_KEY,
    queryFn: getTodos,
  });
};
// ---------- 할 일 목록 조회 ----------

// ---------- 할 일 수정 ----------
const updateTodo = async (updatedTodo: TodoItem) => {
  const { id, title, content } = updatedTodo;
  const response = await axiosAuthInstance.put(`/todos/${id}`, {
    title: title,
    content: content,
  });
  return response.data;
};

export const useUpdateTodo = (): UseMutationResult<
  UpdateTodoResponse,
  TodoError,
  TodoItem
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UpdateTodoResponse, TodoError, TodoItem>({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_LIST_FETCH_QUERY_KEY });
      alert("할 일이 수정되었습니다.");
    },
    onError: (error) =>
      handleAuthError(
        error,
        () => navigate("/auth/signin"),
        "할 일을 수정하는데 실패했습니다."
      ),
  });
};
// ---------- 할 일 수정 ----------
