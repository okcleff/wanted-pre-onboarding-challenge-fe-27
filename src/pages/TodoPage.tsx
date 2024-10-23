import React, { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import { usePostNewTodo, useGetTodos } from "../queries/todo";

interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const TodoPage: React.FC = () => {
  const { data: todos, isFetching, isError, refetch } = useGetTodos();

  const [newTodo, setNewTodo] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const { mutate: postNewTodo, isPending: isPostNewTodoPending } =
    usePostNewTodo();

  const handleAddTodo = () => {
    postNewTodo(newTodo);
    setNewTodo({
      title: "",
      content: "",
    });
    refetch();
  };

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [editMode, setEditMode] = useState(false);

  if (isFetching) return <div>Loading...</div>;

  if (isError)
    return (
      <div>목록을 조회하는데 실패했습니다. 잠시 후 다시 시도해주세요.</div>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">새로운 할 일 추가</h2>
        <div className="mb-4">
          <CommonInput
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            placeholder="새로운 할 일 제목"
            inputClassName="py-2 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <CommonInput
            type="textarea"
            name="content"
            value={newTodo.content}
            onChange={handleInputChange}
            placeholder="새로운 할 일 내용"
            inputClassName="py-2 text-gray-700"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleAddTodo}
            disabled={isPostNewTodoPending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isPostNewTodoPending ? "추가 중..." : "추가"}
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">할 일 목록</h2>
          {todos?.length === 0 && <p>할 일이 없습니다.</p>}
          <ul>
            {todos?.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedTodo(todo)}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">상세 정보</h2>
          {selectedTodo && (
            <div className="border p-4 rounded">
              {editMode ? (
                <div>
                  <input
                    type="text"
                    value={selectedTodo.title}
                    onChange={(e) =>
                      setSelectedTodo({
                        ...selectedTodo,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex justify-end">
                    <button
                      // onClick={() => {
                      //   updateTodo(selectedTodo.id, {
                      //     title: selectedTodo.title,
                      //   });
                      //   setEditMode(false);
                      // }}
                      className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedTodo.title}
                  </h3>
                  <p>{selectedTodo.content}</p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TodoPage;
