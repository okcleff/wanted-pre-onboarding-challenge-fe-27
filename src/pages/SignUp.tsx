import { useState } from "react";
import { usePostSignup } from "../queries/auth";
import CommonInput from "../components/CommonInput";
import { emailRegex } from "../utils";
import { SIGNUP_VALIDATION_ERRORS } from "../constants/auth";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const MIN_PASSWORD_LENGTH = 8;

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 유효성 검사 함수 통합
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return SIGNUP_VALIDATION_ERRORS.EMPTY_EMAIL;
        if (!emailRegex.test(value)) {
          return SIGNUP_VALIDATION_ERRORS.INVALID_EMAIL;
        }
        break;
      case "password":
        if (!value) return SIGNUP_VALIDATION_ERRORS.EMPTY_PASSWORD;
        if (value.length < MIN_PASSWORD_LENGTH) {
          return SIGNUP_VALIDATION_ERRORS.INVALID_PASSWORD;
        }
        break;
      default:
        return "";
    }
    return "";
  };

  // 입력 값 변경 처리 및 유효성 검사
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
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

  // 폼 전체 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const { mutate: postSignupMutation, isPending: isPostSignupPending } =
    usePostSignup();

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      postSignupMutation(formData);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <CommonInput
              labelText="이메일"
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              errorMessage={errors.email}
            />

            <CommonInput
              labelText="비밀번호"
              id="password"
              name="password"
              type="password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              errorMessage={errors.password}
            />

            <div>
              <button
                type="submit"
                className="w-full py-2 mt-8 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200"
                disabled={
                  !formData.email || !formData.password || isPostSignupPending
                }
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
