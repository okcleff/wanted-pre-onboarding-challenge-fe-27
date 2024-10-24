import { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import CommonButton from "../components/common/CommonButton";
import type { AuthFormData } from "../types/auth";
import { emailRegex } from "../utils";

const MIN_PASSWORD_LENGTH = 8;

type AuthInputProps = {
  submitFunc: (data: AuthFormData) => void;
  buttonText: string;
  isPending: boolean;
};

const useAuthInput = () => {
  const AuthInput = ({ submitFunc, buttonText, isPending }: AuthInputProps) => {
    const [submitData, setSubmitData] = useState<AuthFormData>({
      email: "",
      password: "",
    });

    const [errors, setErrors] = useState<AuthFormData>({
      email: "",
      password: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setSubmitData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // 제출 버튼을 누른 이후에는 매 입력마다 유효성 검사
      if (isSubmitted) {
        const error = validateField(name, value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      }
    };

    const validateForm = (): boolean => {
      const newErrors = {
        email: validateField("email", submitData.email),
        password: validateField("password", submitData.password),
      };

      setErrors(newErrors);
      return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);

      if (validateForm()) {
        submitFunc(submitData);
      }
    };

    const validateField = (name: string, value: string): string => {
      switch (name) {
        case "email":
          if (!value) return "이메일을 입력해주세요.";
          if (!emailRegex.test(value)) {
            return "이메일 형식에 맞게 입력해주세요.";
          }
          break;
        case "password":
          if (!value) return "비밀번호를 입력해주세요.";
          if (value.length < MIN_PASSWORD_LENGTH) {
            return "패스워드 길이는 8 이상이어야 합니다.";
          }
          break;
        default:
          return "";
      }
      return "";
    };

    return (
      <form onSubmit={handleSubmit}>
        <CommonInput
          labelText="이메일"
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={submitData.email}
          onChange={handleInputChange}
          errorMessage={errors.email}
          inputClassName="h-10"
        />

        <CommonInput
          labelText="비밀번호"
          id="password"
          name="password"
          type="password"
          required
          placeholder="········"
          value={submitData.password}
          onChange={handleInputChange}
          errorMessage={errors.password}
          inputClassName="h-10"
        />

        <CommonButton
          type="submit"
          disabled={isPending}
          buttonText={buttonText}
          className="mt-8"
        />
      </form>
    );
  };

  return { AuthInput };
};
export default useAuthInput;
