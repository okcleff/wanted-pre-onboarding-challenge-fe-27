import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostSignin } from "../queries/auth";
import CommonInput from "../components/common/CommonInput";
import CommonButton from "../components/common/CommonButton";
import { emailRegex } from "../utils";

type SubmitData = {
  email: string;
  password: string;
};

const SigninPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const [submitData, setSubmitData] = useState<SubmitData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SubmitData>({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const { mutate: postSigninMutation, isPending: isPostSigninPending } =
    usePostSignin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      postSigninMutation(submitData);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
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
              value={submitData.email}
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
              value={submitData.password}
              onChange={handleInputChange}
              errorMessage={errors.password}
            />

            <CommonButton
              type="submit"
              disabled={isPostSigninPending}
              buttonText="로그인"
              className="mt-8"
            />

            <CommonButton
              type="button"
              buttonText="회원가입하기"
              className="bg-indigo-300 hover:bg-indigo-400 mt-4"
              onClick={() => navigate("/auth/signup")}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
