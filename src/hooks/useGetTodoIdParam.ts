import { useParams, useNavigate } from "react-router-dom";

const useGetTodoIdParam = () => {
  const { id: selectedTodoId } = useParams();

  const navigate = useNavigate();

  const setSelectedTodoId = (id: string) => {
    navigate(`/${id}`);
  };

  const goToHome = () => {
    navigate("/");
  };

  return { selectedTodoId, setSelectedTodoId, goToHome };
};
export default useGetTodoIdParam;
