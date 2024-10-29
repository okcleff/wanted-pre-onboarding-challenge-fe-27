import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";
import Loading from "../common/Loading";

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
};

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  const [searchParams] = useSearchParams();
  const todoId = searchParams.get("id");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[todoId]}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
