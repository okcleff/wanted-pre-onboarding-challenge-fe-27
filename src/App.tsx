import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import AuthLayout from "./components/layouts/AuthLayout";
import AuthMiddleware from "./components/middleware/AuthMiddleware";

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
        <Route path="/" element={<TodoPage />} />
        <Route
          element={
            <AuthMiddleware>
              <AuthLayout />
            </AuthMiddleware>
          }
        >
          <Route path="/auth/signup" element={<AuthPage />} />
          <Route path="/auth/signin" element={<AuthPage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
