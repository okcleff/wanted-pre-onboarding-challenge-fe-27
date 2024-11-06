import { useNavigate } from "react-router-dom";

import AuthPageTitle from "../components/auth/AuthPageTitle";
import AuthInputSection from "../components/auth/AuthInputSection";
import AuthInput from "../components/auth/AuthInput";
import CommonButton from "../components/common/CommonButton";
import { usePostSignup } from "../queries/auth";

const SignupPage = () => {
  const navigate = useNavigate();

  const { mutate: postSignupMutation, isPending: isPostSignupPending } =
    usePostSignup();

  return (
    <>
      <AuthPageTitle title="회원가입" />

      <AuthInputSection>
        <AuthInput
          submitFunc={postSignupMutation}
          buttonText="가입하기"
          isPending={isPostSignupPending}
        />
        <CommonButton
          type="button"
          buttonText="로그인하러 가기"
          className="bg-indigo-200 hover:bg-indigo-300 mt-4 text-black"
          onClick={() => navigate("/auth/signin")}
        />
      </AuthInputSection>
    </>
  );
};

export default SignupPage;
