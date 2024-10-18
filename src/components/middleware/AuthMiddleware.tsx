import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 토큰이 있으면 홈('/')으로, 토큰이 없으면 로그인 페이지로 리다이렉트
    navigate(token ? "/" : "/auth/signin");
  }, [navigate]);

  return children;
};

export default AuthMiddleware;
