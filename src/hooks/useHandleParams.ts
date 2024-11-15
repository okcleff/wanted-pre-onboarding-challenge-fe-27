import { startTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Params } from "react-router-dom";

import { createQueryString, getInitialQueriesFromURL } from "../utils";

const useHandleParams = (paramName: string) => {
  const navigate = useNavigate();
  const params: Params = useParams();
  const selectedParam = params[paramName];

  // navigate시 현재 url의 쿼리스트링을 유지
  const urlQueries = getInitialQueriesFromURL();
  const queryString = createQueryString(urlQueries);

  const setSelectedParam = (pathname: string) => {
    startTransition(() => {
      navigate({
        pathname,
        search: queryString || "",
      });
    });
  };

  const goToHome = () => {
    navigate({
      pathname: `/`,
      search: queryString || "",
    });
  };

  return { selectedParam, setSelectedParam, goToHome };
};

export default useHandleParams;
