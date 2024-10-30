import { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import CommonButton from "../components/common/CommonButton";
import type { AuthFormData, AuthInputProps } from "../types/auth";
import { MIN_PASSWORD_LENGTH, EMAIL_REGEX } from "../constants";

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

    const validateField = (name: string, value: string): string => {
      switch (name) {
        case "email":
          if (!value) return "이메일을 입력해주세요.";
          if (!EMAIL_REGEX.test(value)) {
            return "이메일 형식에 맞게 입력해주세요.";
          }
          break;
        case "password":
          if (!value) return "비밀번호를 입력해주세요.";
          if (value.length < MIN_PASSWORD_LENGTH) {
            return `패스워드 길이는 ${MIN_PASSWORD_LENGTH} 이상이어야 합니다.`;
          }
          break;
        default:
          return "";
      }
      return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setSubmitData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      const error = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
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

      if (validateForm()) {
        submitFunc(submitData);
      }
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
          wrapperClassName="mt-6"
          inputClassName="h-10"
        />

        <CommonButton
          type="submit"
          disabled={isPending}
          buttonText={buttonText}
          className="mt-12"
        />
      </form>
    );
  };

  return { AuthInput };
};
export default useAuthInput;
