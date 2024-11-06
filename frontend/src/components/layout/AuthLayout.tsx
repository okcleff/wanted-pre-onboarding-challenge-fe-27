import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  );
};
export default AuthLayout;
