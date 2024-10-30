import React, { lazy } from "react";
import { useSearchParams } from "react-router-dom";
import TodoAdd from "../components/todo/TodoAdd";
import TodoList from "../components/todo/TodoList";
import ErrorBoundaryWrapper from "../components/error/ErrorBoundaryWrapper";

const TodoDetail = lazy(() => import("../components/todo/TodoDetail"));

const TodoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedTodoId = searchParams.get("id");

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ErrorBoundaryWrapper>
          <TodoAdd />
        </ErrorBoundaryWrapper>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
          <ErrorBoundaryWrapper>
            <TodoList />
          </ErrorBoundaryWrapper>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">상세 정보</h2>
          {selectedTodoId && (
            <ErrorBoundaryWrapper>
              <TodoDetail />
            </ErrorBoundaryWrapper>
          )}
        </div>
      </section>
    </>
  );
};

export default TodoPage;
