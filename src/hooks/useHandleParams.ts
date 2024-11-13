import { useParams, useNavigate } from "react-router-dom";
import type { Params } from "react-router-dom";

const useHandleParams = (paramName: string) => {
  const params: Params = useParams();
  const selectedParam = params[paramName];

  const navigate = useNavigate();

  const setSelectedParam = (value: string) => {
    const newParams = { ...params, [paramName]: value };
    const newPath = `/${Object.keys(newParams)
      .map((key) => `${key}/${newParams[key]}`)
      .join("/")}`;
    navigate(newPath);
  };

  const goToHome = () => {
    navigate("/");
  };

  return { selectedParam, setSelectedParam, goToHome };
};

export default useHandleParams;
