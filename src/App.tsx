import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/layouts/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
