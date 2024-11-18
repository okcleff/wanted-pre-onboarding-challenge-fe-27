import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CommonButton from "../common/CommonButton";
import { localStorageAuthInstance } from "../../utils/auth";

const TodoLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorageAuthInstance.remove();
      toast.success("로그아웃 되었습니다.");
      navigate("/auth/signin");
    }
  };

  return (
    <main className="p-8">
      <header className="flex justify-end">
        <CommonButton onClick={handleLogout} className="w-20">
          <span>로그아웃</span>
        </CommonButton>
      </header>
      <Outlet />
    </main>
  );
};
export default TodoLayout;
