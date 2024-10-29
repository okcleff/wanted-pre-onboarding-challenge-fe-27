import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonButton from "../common/CommonButton";

const TodoLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("로그아웃 되었습니다.");
    navigate("/auth/signin");
  };

  return (
    <div className="p-8">
      <div className="flex justify-end">
        <CommonButton
          type="button"
          buttonText="로그아웃"
          onClick={handleLogout}
          className="w-20"
        />
      </div>
      <Outlet />
    </div>
  );
};
export default TodoLayout;
