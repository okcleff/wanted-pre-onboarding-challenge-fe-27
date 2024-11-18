import { useNavigate } from "react-router-dom";

import AuthPageTitle from "../components/auth/AuthPageTitle";
import AuthFormSection from "../components/auth/AuthFormSection";
import SigninForm from "../components/auth/SigninForm";
import CommonButton from "../components/common/CommonButton";

const SigninPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthPageTitle title="로그인" />

      <AuthFormSection>
        <SigninForm />
        <CommonButton
          className="bg-indigo-200 hover:bg-indigo-300 mt-4 text-black"
          onClick={() => navigate("/auth/signup")}
        >
          <span>회원가입하기</span>
        </CommonButton>
      </AuthFormSection>
    </>
  );
};

export default SigninPage;
