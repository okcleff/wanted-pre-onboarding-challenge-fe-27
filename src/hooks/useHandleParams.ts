import { useParams, useNavigate } from "react-router-dom";
import type { Params } from "react-router-dom";
import { startTransition } from "react";

const useHandleParams = (paramName: string) => {
  const params: Params = useParams();
  const selectedParam = params[paramName];

  const navigate = useNavigate();

  const setSelectedParam = (value: string) => {
    startTransition(() => {
      navigate(value);
    });
  };

  const goToHome = () => {
    navigate("/");
  };

  return { selectedParam, setSelectedParam, goToHome };
};

export default useHandleParams;
