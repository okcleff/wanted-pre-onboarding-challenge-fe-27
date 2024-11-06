import { useNavigate } from "react-router-dom";

import AuthPageTitle from "../components/auth/AuthPageTitle";
import AuthInputSection from "../components/auth/AuthInputSection";
import AuthInput from "../components/auth/AuthInput";
import CommonButton from "../components/common/CommonButton";
import { usePostSignin } from "../queries/auth";

const SigninPage = () => {
  const navigate = useNavigate();

  const { mutate: postSigninMutation, isPending: isPostSigninPending } =
    usePostSignin();

  return (
    <>
      <AuthPageTitle title="로그인" />

      <AuthInputSection>
        <AuthInput
          submitFunc={postSigninMutation}
          buttonText="로그인"
          isPending={isPostSigninPending}
        />
        <CommonButton
          type="button"
          buttonText="회원가입하기"
          className="bg-indigo-200 hover:bg-indigo-300 mt-4 text-black"
          onClick={() => navigate("/auth/signup")}
        />
      </AuthInputSection>
    </>
  );
};

export default SigninPage;
