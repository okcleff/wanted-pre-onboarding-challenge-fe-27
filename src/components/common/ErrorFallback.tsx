import { useNavigate } from "react-router-dom";

type ErrorFallbackProps = {
  error: {
    message: string;
    response: {
      status: number;
      data: {
        details: string;
      };
    };
  };
  resetErrorBoundary: () => void;
};

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
          {error.message} : {error.response.data.details}
        </pre>
        <div className="space-x-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            홈으로 이동
          </button>
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
