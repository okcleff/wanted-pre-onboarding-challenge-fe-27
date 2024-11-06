import { useSearchParams } from "react-router-dom";

const useGetTodoIdParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTodoId = searchParams.get("id") || "";

  const setSelectedTodoId = (id: string) => {
    setSearchParams({ id });
  };

  const deleteTodoIdParam = () => {
    setSearchParams({});
  };

  return { selectedTodoId, setSelectedTodoId, deleteTodoIdParam };
};
export default useGetTodoIdParam;
