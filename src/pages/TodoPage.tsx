import React, { useState } from "react";
import TodoAdd from "../components/todo/TodoAdd";
import TodoList from "../components/todo/TodoList";
import TodoDetail from "../components/todo/TodoDetail";
import { useGetTodos } from "../queries/todo";
import { TodoItem } from "../types/todo";

const TodoPage: React.FC = () => {
  const { data: todos, isLoading, isError } = useGetTodos();

  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>목록을 조회하는데 실패했습니다. 잠시 후 다시 시도해주세요.</div>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <TodoAdd />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <TodoList todos={todos || []} setSelectedTodo={setSelectedTodo} />

        <TodoDetail
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      </section>
    </div>
  );
};

export default TodoPage;
