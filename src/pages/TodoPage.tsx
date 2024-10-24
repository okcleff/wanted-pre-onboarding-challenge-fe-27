import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TodoAdd from "../components/todo/TodoAdd";
import TodoList from "../components/todo/TodoList";
import TodoDetail from "../components/todo/TodoDetail";
import { useGetTodos } from "../queries/todo";
import type { TodoItem } from "../types/todo";

const TodoPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth/signin");
  }, [navigate]);

  const { data: todos } = useGetTodos();

  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const todo = todos?.find((todo) => todo.id === id) || null;
      setSelectedTodo(todo);
    } else {
      setSelectedTodo(null);
    }
  }, [searchParams, todos]);

  const handleSelectTodo = (todo: TodoItem | null) => {
    setSelectedTodo(todo);
    if (todo) setSearchParams({ id: todo.id });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <TodoAdd />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <TodoList todos={todos || []} setSelectedTodo={handleSelectTodo} />

        <TodoDetail
          selectedTodo={selectedTodo}
          setSelectedTodo={handleSelectTodo}
        />
      </section>
    </div>
  );
};

export default TodoPage;
