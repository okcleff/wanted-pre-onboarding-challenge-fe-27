import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

interface SignupFormData {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token: string;
}

interface SignupError {
  response: {
    data: {
      details: string;
    };
  };
}

// 회원가입 요청 함수
const postSignup = async (
  formData: SignupFormData
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/users/create",
    formData
  );
  return response.data;
};

// useMutation을 사용한 회원가입 훅
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
