import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import AuthLayout from "./components/layouts/AuthLayout";
import AuthMiddleware from "./components/middleware/AuthMiddleware";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/auth/signup"
          element={
            <AuthMiddleware>
              <AuthPage />
            </AuthMiddleware>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <AuthMiddleware>
              <AuthPage />
            </AuthMiddleware>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
