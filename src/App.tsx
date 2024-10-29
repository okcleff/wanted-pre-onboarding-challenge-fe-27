import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./components/layout/AuthLayout";
import TodoLayout from "./components/layout/TodoLayout";
import ErrorBoundaryWrapper from "./components/error/ErrorBoundaryWrapper";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/signin" replace />;
};

const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
                <RedirectIfAuthenticated>
                  <SigninPage />
                </RedirectIfAuthenticated>
              </ErrorBoundaryWrapper>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer autoClose={3000} theme="colored" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
