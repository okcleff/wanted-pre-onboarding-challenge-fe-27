import useGetTodoIdParam from "../../hooks/useGetTodoIdParam";
import { useGetTodos } from "../../queries/todo";
import TodoPriorityLabel from "./TodoPriorityLabel";

const TodoList = () => {
  const { data: todos } = useGetTodos();

  const { selectedTodoId, setSelectedTodoId } = useGetTodoIdParam();

  const { data: todoList } = todos;

  if (todoList.length === 0) {
    return <p>할 일이 없습니다.</p>;
  }

  return (
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
  );
};
export default TodoList;
