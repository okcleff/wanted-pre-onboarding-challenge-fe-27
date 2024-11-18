import { useNavigate } from "react-router-dom";

import AuthPageTitle from "../components/auth/AuthPageTitle";
import AuthFormSection from "../components/auth/AuthFormSection";
import SignupForm from "../components/auth/SignupForm";
import CommonButton from "../components/common/CommonButton";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AuthPageTitle title="회원가입" />

      <AuthFormSection>
        <SignupForm />
        <CommonButton
          className="bg-indigo-200 hover:bg-indigo-300 mt-4 text-black"
          onClick={() => navigate("/auth/signin")}
        >
          <span>로그인하러 가기</span>
        </CommonButton>
      </AuthFormSection>
    </>
  );
};

export default SignupPage;
