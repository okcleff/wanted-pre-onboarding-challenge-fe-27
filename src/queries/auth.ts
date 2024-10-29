import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import type { AuthFormData, AuthResponse, AuthError } from "../types/auth";

const handleAuthError = (
  error: AuthError,
  customErrorMessage: string = "에러가 발생했습니다. 잠시 후 다시 시도해주세요."
) => {
  console.error("auth.ts - Error", error);

  alert(error.response?.data.details || customErrorMessage);
};

// ---------- 회원가입 ----------
const postSignup = async (signupForm: AuthFormData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/users/create",
    signupForm
  );
  return response.data;
};

export const usePostSignup = () => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AuthError, AuthFormData>({
    mutationFn: postSignup,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      handleAuthError(
        error,
        "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    },
  });
};
// ---------- 회원가입 ----------

// ---------- 로그인 ----------
export const postSignin = async (
  signinForm: AuthFormData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/users/login",
    signinForm
  );
  return response.data;
};

export const usePostSignin = () => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AuthError, AuthFormData>({
    mutationFn: postSignin,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      navigate("/");
    },
    onError: (error) => {
      handleAuthError(
        error,
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    },
  });
};
// ---------- 로그인 ----------
