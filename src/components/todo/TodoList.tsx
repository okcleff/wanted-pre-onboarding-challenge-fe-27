import { useNavigate, useParams } from "react-router";

import TodoPriorityLabel from "./TodoPriorityLabel";
import TodoListFilter from "./TodoListFilter";
import { useFilterParams } from "../../hooks/useFilterParams";
import { todoFilterSanitizer } from "../../utils/todo";
import { useGetTodos } from "../../queries/todo";
import { INITIAL_TODO_FILTERS } from "../../constants";
import type { TodoFilters } from "../../types/todo";

const TodoList = () => {
  const { id: selectedTodoId } = useParams();
  const navigate = useNavigate();

  const { filters, setFilters } = useFilterParams<TodoFilters>({
    initialFilters: INITIAL_TODO_FILTERS,
    sanitizeFilter: todoFilterSanitizer,
  });

  const { data: todos } = useGetTodos({ ...filters });

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
                onClick={() => navigate(id)}
              >
                <span>{title}</span>
                {todo.priority && (
                  <TodoPriorityLabel priority={todo.priority} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default TodoList;
