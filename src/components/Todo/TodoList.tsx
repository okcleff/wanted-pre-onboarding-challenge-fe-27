import { useSearchParams } from "react-router-dom";
import { useGetTodos } from "../../queries/todo";

const TodoList = () => {
  const { data: todos } = useGetTodos();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentId = searchParams.get("id");

  return (
    <>
      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul className="max-h-[500px] overflow-y-scroll">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100 overflow-scroll ${
                  todo.id === currentId ? "bg-gray-100" : ""
                }`}
                onClick={() => setSearchParams({ id: todo.id })}
              >
                {todo.title}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default TodoList;
