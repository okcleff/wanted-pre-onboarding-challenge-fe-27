import { Navigate } from "react-router-dom";

import { localStorageAuthInstance } from "../utils/auth";

const isAuthenticated = () => {
  return localStorageAuthInstance.hasToken();
};

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth/signin" replace />;
};

export const PreAuthenticatedRoute = ({
  element,
}: {
  element: JSX.Element;
}) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : element;
};
