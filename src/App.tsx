import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import QueryClientProvider from "./provider/QueryClientProvider";
import AuthLayout from "./components/layout/AuthLayout";
import TodoLayout from "./components/layout/TodoLayout";
import ErrorBoundaryWrapper from "./components/error/ErrorBoundaryWrapper";
import { AuthInstance } from "./utils/auth";

import "react-toastify/dist/ReactToastify.css";

const SigninPage = React.lazy(() => import("./pages/SigninPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const TodoPage = React.lazy(() => import("./pages/TodoPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const isAuthenticated = () => {
  return new AuthInstance(localStorage).hasToken();
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/signin" replace />;
};

const PreAuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <Routes>
        <Route element={<TodoLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/auth/signup"
            element={
              <ErrorBoundaryWrapper>
                <SignupPage />
              </ErrorBoundaryWrapper>
            }
          />

          <Route
            path="/auth/signin"
            element={
              <ErrorBoundaryWrapper>
                <PreAuthenticatedRoute>
                  <SigninPage />
                </PreAuthenticatedRoute>
              </ErrorBoundaryWrapper>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer autoClose={2000} theme="colored" />
    </QueryClientProvider>
  );
};

export default App;
