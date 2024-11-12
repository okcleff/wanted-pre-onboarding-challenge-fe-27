import { useState } from "react";
import TodoPriorityLabel from "./TodoPriorityLabel";
import TodoListFilter from "./TodoListFilter";
import useGetTodoIdParam from "../../hooks/useGetTodoIdParam";
import { useGetTodos } from "../../queries/todo";
import type { TodoFilters } from "../../types/todo";

const TodoList = () => {
  const [filters, setFilters] = useState<TodoFilters>({
    priorityFilter: undefined,
    keyword: undefined,
    sort: "createdAt",
    order: "desc",
  });

  const { data: todos } = useGetTodos({ ...filters });

  const { selectedTodoId, setSelectedTodoId } = useGetTodoIdParam();

  const { data: todoList } = todos;

  return (
    <>
      <TodoListFilter filters={filters} setFilters={setFilters} />

      {todoList.length === 0 && <p>할 일이 없습니다.</p>}

      {todoList.length > 0 && (
        <ul className="max-h-[500px] overflow-y-scroll">
          {todoList.map((todo) => {
            const { id, title } = todo;
            return (
              <li
                key={id}
                className={`flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100 overflow-scroll ${
                  id === selectedTodoId ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedTodoId(id)}
              >
                <span>{title}</span>
                <TodoPriorityLabel priority={todo.priority} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default TodoList;
