import { useState } from "react";

import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import { AUTH_INPUT_DEFAULT_VALUE } from "../../constants";
import {
  getErrorMessageByValidation,
  hasAnyTruthyField,
} from "../../utils/auth";
import type { AuthFormData } from "../../types/auth";

export interface AuthInputProps {
  submitFunc: (data: AuthFormData) => void;
  buttonText: string;
  isPending: boolean;
}

const AuthInput = ({ submitFunc, buttonText, isPending }: AuthInputProps) => {
  const [submitData, setSubmitData] = useState<AuthFormData>(
    AUTH_INPUT_DEFAULT_VALUE
  );

  const [errors, setErrors] = useState<AuthFormData>(AUTH_INPUT_DEFAULT_VALUE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSubmitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorMessage = getErrorMessageByValidation(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 에러가 하나라도 있으면 폼을 제출하지 않음
    const isFormValid = !hasAnyTruthyField(errors);

    if (isFormValid) {
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

export default AuthInput;
