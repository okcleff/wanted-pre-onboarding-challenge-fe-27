import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import AuthLayout from "./components/layouts/AuthLayout";
import AuthMiddleware from "./components/middleware/AuthMiddleware";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthMiddleware>
            <AuthLayout />
          </AuthMiddleware>
        }
      >
        <Route path="/" element={<TodoPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />
        <Route path="/auth/signin" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default App;
