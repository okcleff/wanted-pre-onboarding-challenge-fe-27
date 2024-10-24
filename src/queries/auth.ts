import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import type { AuthFormData, AuthResponse, AuthError } from "../types/auth";

// ---------- 회원가입 ----------
const postSignup = async (signupForm: AuthFormData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/users/create",
    signupForm
  );
  return response.data;
};

export const usePostSignup = (): UseMutationResult<
  AuthResponse,
  AuthError,
  AuthFormData
> => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AuthError, AuthFormData>({
    mutationFn: postSignup,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert(
        error.response.data.details ||
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

export const usePostSignin = (): UseMutationResult<
  AuthResponse,
  AuthError,
  AuthFormData
> => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AuthError, AuthFormData>({
    mutationFn: postSignin,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      navigate("/");
    },
    onError: (error) => {
      alert(
        error.response.data.details ||
          "로그인에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    },
  });
};
// ---------- 로그인 ----------
