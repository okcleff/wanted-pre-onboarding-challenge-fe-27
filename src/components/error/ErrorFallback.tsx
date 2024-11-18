import { useNavigate } from "react-router-dom";
import CommonButton from "../common/CommonButton";

interface ErrorFallbackProps {
  error: {
    message: string;
    response?: {
      status: number;
      data: {
        details: string;
      };
    };
  };
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleReset = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          페이지 로드 중 문제가 발생했습니다
        </h2>
        <pre className="text-sm bg-gray-100 p-4 rounded mb-4 overflow-auto">
          {error.message}
          {!!error.response && ` : ${error?.response?.data.details}`}
        </pre>
        <div className="flex justify-between gap-3">
          <CommonButton
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <span>홈으로 이동</span>
          </CommonButton>
          <CommonButton
            onClick={resetErrorBoundary}
            className="bg-gray-500 hover:bg-gray-600"
          >
            <span>다시 시도</span>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
