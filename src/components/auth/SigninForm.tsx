import { useState } from "react";

import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import { usePostSignin } from "../../queries/auth";
import { hasAnyTruthyField, getErrorMessageObject } from "../../utils/auth";
import { AUTH_INPUT_DEFAULT_VALUE } from "../../constants";
import type { AuthFormData } from "../../types/auth";

const SigninForm = () => {
  const { mutate: postSigninMutation, isPending: isPostSigninPending } =
    usePostSignin();

  const [inputValue, setInputValue] = useState<AuthFormData>(
    AUTH_INPUT_DEFAULT_VALUE,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const errors = getErrorMessageObject(inputValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 에러가 있는 경우 폼을 제출하지 않음
    if (hasAnyTruthyField(errors)) return;

    postSigninMutation(inputValue);
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
        value={inputValue.email}
        onChange={handleInputChange}
        errorMessage={inputValue.email ? errors.email : ""}
        inputClassName="h-10"
      />

      <CommonInput
        labelText="비밀번호"
        id="password"
        name="password"
        type="password"
        required
        placeholder="········"
        value={inputValue.password}
        onChange={handleInputChange}
        errorMessage={inputValue.password ? errors.password : ""}
        wrapperClassName="mt-6"
        inputClassName="h-10"
      />

      <CommonButton
        type="submit"
        disabled={isPostSigninPending}
        className="mt-12"
      >
        <span>로그인</span>
      </CommonButton>
    </form>
  );
};
export default SigninForm;
