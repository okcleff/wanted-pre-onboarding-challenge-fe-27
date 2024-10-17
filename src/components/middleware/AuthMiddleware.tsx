import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 토큰이 있으면 홈('/')으로 리다이렉트
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default AuthMiddleware;
