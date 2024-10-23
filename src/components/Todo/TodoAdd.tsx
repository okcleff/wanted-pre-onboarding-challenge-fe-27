import React, { useState } from "react";
import CommonInput from "../common/CommonInput";
import { usePostNewTodo } from "../../queries/todo";

const TodoAdd = () => {
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
  };

  return (
    <>
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
    </>
  );
};
export default TodoAdd;
