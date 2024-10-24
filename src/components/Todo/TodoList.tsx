import React from "react";
import type { TodoItem } from "../../types/todo";

type TodoListProps = {
  todos: TodoItem[];
  selectedTodo: TodoItem | null;
  setSelectedTodo: (todo: TodoItem) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
      {todos?.length === 0 && <p>할 일이 없습니다.</p>}
      <ul>
        {todos?.map((todo) => {
          return (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100 ${
                todo.id === selectedTodo?.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedTodo(todo)}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
