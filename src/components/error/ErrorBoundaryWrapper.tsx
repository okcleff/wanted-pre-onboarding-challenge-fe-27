import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";
import Loading from "../common/Loading";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  const [searchParams] = useSearchParams();
  // TodoDetail에서 오류가 발생했을 때, TodoList에서 할 일을 다시 클릭하여 TodoDetail를 리셋하기 위함
  const todoId = searchParams.get("id");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[todoId]}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
