import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TodoAdd from "../components/todo/TodoAdd";
import TodoList from "../components/todo/TodoList";
import TodoDetail from "../components/todo/TodoDetail";
import ErrorBoundaryWrapper from "../components/error/ErrorBoundaryWrapper";
import { useGetTodos } from "../queries/todo";
import type { TodoItem } from "../types/todo";

const TodoPage: React.FC = () => {
  const { data: todos } = useGetTodos();

  // 선택한 할 일을 URL 파라미터로 관리, 새로고침시 선택한 할 일 유지
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const todo = todos?.find((todo) => todo.id === id) || null;
      setSelectedTodo(todo);

      // 선택한 할 일이 없으면 URL 파라미터에서 제거
      setSearchParams(todo ? { id } : {});
    } else {
      setSelectedTodo(null);
    }
  }, [todos, searchParams, setSearchParams]);

  const handleSelectTodo = (todo: TodoItem | null) => {
    setSelectedTodo(todo);
    if (todo) setSearchParams({ id: todo.id });
  };

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
            <TodoList
              todos={todos || []}
              selectedTodo={selectedTodo}
              handleSelectTodo={handleSelectTodo}
            />
          </ErrorBoundaryWrapper>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">상세 정보</h2>
          {selectedTodo && (
            <ErrorBoundaryWrapper>
              <TodoDetail
                selectedTodo={selectedTodo}
                handleSelectTodo={handleSelectTodo}
              />
            </ErrorBoundaryWrapper>
          )}
        </div>
      </section>
    </>
  );
};

export default TodoPage;
