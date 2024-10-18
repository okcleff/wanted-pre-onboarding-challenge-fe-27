import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { axiosAuthInstance } from "./axiosInstance";

type TodoItem = {
  title: string;
  content: string;
};

type TodoReturnType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

type GetTodoResponse = TodoReturnType[];

type CreateTodoResponse = TodoReturnType;

type TodoError = {
  response: {
    status: number;
    data: {
      details: string;
    };
  };
};

const postNewTodo = async (todo: TodoItem) => {
  const response = await axiosAuthInstance.post("/todos", todo);
  return response.data;
};

export const usePostNewTodo = (): UseMutationResult<
  CreateTodoResponse,
  TodoError,
  TodoItem
> => {
  const navigate = useNavigate();

  return useMutation<CreateTodoResponse, TodoError, TodoItem>({
    mutationFn: postNewTodo,
    onSuccess: () => {
      alert("할 일이 추가되었습니다.");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        return navigate("/auth/signin");
      }

      alert(
        error.response.data.details ||
          "할 일 추가에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    },
  });
};

const getTodos = async () => {
  const response = await axiosAuthInstance.get("/todos");
  return response.data.data;
};

export const useGetTodos = () => {
  return useQuery<GetTodoResponse, TodoError>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
