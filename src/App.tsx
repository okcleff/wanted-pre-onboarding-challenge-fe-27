import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./components/layout/AuthLayout";
import TodoLayout from "./components/layout/TodoLayout";
import ErrorBoundaryWrapper from "./components/error/ErrorBoundaryWrapper";

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

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
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
              <ErrorBoundaryWrapper>
                <PrivateRoute>
                  <TodoPage />
                </PrivateRoute>
              </ErrorBoundaryWrapper>
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
                <PublicRoute>
                  <SigninPage />
                </PublicRoute>
              </ErrorBoundaryWrapper>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
