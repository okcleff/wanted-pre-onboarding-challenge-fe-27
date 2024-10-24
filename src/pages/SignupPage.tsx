import AuthPageTitle from "../components/auth/AuthPageTitle";
import AuthInputSection from "../components/auth/AuthInputSection";
import { usePostSignup } from "../queries/auth";
import useAuthInput from "../hooks/useAuthInput";

const SignupPage = () => {
  const { mutate: postSignupMutation, isPending: isPostSignupPending } =
    usePostSignup();

  const { AuthInput } = useAuthInput();

  return (
    <>
      <AuthPageTitle title="회원가입" />

      <AuthInputSection>
        <AuthInput
          submitFunc={postSignupMutation}
          buttonText="가입하기"
          isPending={isPostSignupPending}
        />
      </AuthInputSection>
    </>
  );
};

export default SignupPage;
