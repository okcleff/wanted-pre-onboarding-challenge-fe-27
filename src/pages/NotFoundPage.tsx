import { useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-bold text-gray-900">404</h1>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            요청하신 페이지가 삭제되었거나 잘못된 경로입니다.
          </p>
        </div>

        <CommonButton
          type="button"
          buttonText="뒤로가기"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
