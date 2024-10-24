import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./components/layouts/AuthLayout";
import ErrorBoundaryWrapper from "./components/common/ErrorBoundaryWrapper";

const isSignedIn = !!localStorage.getItem("token");

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? (
              <ErrorBoundaryWrapper>
                <TodoPage />
              </ErrorBoundaryWrapper>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />

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
              isSignedIn ? (
                <Navigate to="/" replace />
              ) : (
                <ErrorBoundaryWrapper>
                  <SigninPage />
                </ErrorBoundaryWrapper>
              )
            }
          />
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
