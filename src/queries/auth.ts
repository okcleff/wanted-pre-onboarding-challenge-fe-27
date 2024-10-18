import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

type SignupFormData = {
  email: string;
  password: string;
};

type SignupResponse = {
  message: string;
  token: string;
};

type SignupError = {
  response: {
    data: {
      details: string;
    };
  };
};

const postSignup = async (
  signupForm: SignupFormData
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/users/create",
    signupForm
  );
  return response.data;
};

export const usePostSignup = (): UseMutationResult<
  SignupResponse,
  SignupError,
  SignupFormData
> => {
  const navigate = useNavigate();

  return useMutation<SignupResponse, SignupError, SignupFormData>({
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

export const postSignin = async (
  signinForm: SignupFormData
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/users/login",
    signinForm
  );
  return response.data;
};

export const usePostSignin = (): UseMutationResult<
  SignupResponse,
  SignupError,
  SignupFormData
> => {
  const navigate = useNavigate();

  return useMutation<SignupResponse, SignupError, SignupFormData>({
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
