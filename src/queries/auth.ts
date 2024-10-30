import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRequest } from "./axiosInstance";
import { handleAPIError } from "../utils";
import type { AuthFormData, AuthResponse, ErrorResponse } from "../types/auth";

// ---------- 회원가입 ----------
const postSignup = async (signupForm: AuthFormData): Promise<AuthResponse> => {
  return apiRequest.post<AuthResponse, AuthFormData>(
    "/users/create",
    signupForm
  );
};

export const usePostSignup = () => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, ErrorResponse, AuthFormData>({
    mutationFn: postSignup,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      toast.success("회원가입이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      handleAPIError(
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
  return apiRequest.post<AuthResponse, AuthFormData>(
    "/users/signin",
    signinForm
  );
};

export const usePostSignin = () => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, ErrorResponse, AuthFormData>({
    mutationFn: postSignin,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      toast.success("로그인 되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      handleAPIError(
        error,
        "로그인에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    },
  });
};
// ---------- 로그인 ----------
