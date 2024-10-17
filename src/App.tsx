import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
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
              <Signup />
            </AuthMiddleware>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <AuthMiddleware>
              <Signin />
            </AuthMiddleware>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
