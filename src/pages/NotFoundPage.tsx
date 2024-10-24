import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-bold text-gray-900">404</h1>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            요청하신 페이지가 삭제되었거나 잘못된 경로입니다. 홈으로 돌아가서
            다시 시도해주세요.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
