import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import TodoLayout from "../components/layout/TodoLayout";
import ErrorBoundaryWrapper from "../components/error/ErrorBoundaryWrapper";
import { PrivateRoute, PreAuthenticatedRoute } from "./auth";

const SigninPage = React.lazy(() => import("../pages/SigninPage"));
const SignupPage = React.lazy(() => import("../pages/SignupPage"));
const TodoPage = React.lazy(() => import("../pages/TodoPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoLayout />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundaryWrapper>
            <PrivateRoute element={<TodoPage />} />
          </ErrorBoundaryWrapper>
        ),
        children: [
          {
            path: ":id",
            element: (
              <ErrorBoundaryWrapper>
                <PrivateRoute element={<TodoPage />} />
              </ErrorBoundaryWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: (
          <ErrorBoundaryWrapper>
            <SignupPage />
          </ErrorBoundaryWrapper>
        ),
      },
      {
        path: "signin",
        element: (
          <ErrorBoundaryWrapper>
            <PreAuthenticatedRoute element={<SigninPage />} />
          </ErrorBoundaryWrapper>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
