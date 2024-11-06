import React, { useState } from "react";

import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import { TODO_INPUT_DEFAULT_VALUE } from "../../constants";
import { usePostNewTodo } from "../../queries/todo";

const TodoAdd = () => {
  const [newTodo, setNewTodo] = useState(TODO_INPUT_DEFAULT_VALUE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const { mutate: postNewTodo, isPending: isPostNewTodoPending } =
    usePostNewTodo();

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postNewTodo(newTodo, {
      onSuccess: () => setNewTodo(TODO_INPUT_DEFAULT_VALUE),
    });
  };

  return (
    <form onSubmit={handleAddTodo}>
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
        <CommonButton
          type="submit"
          disabled={!newTodo.title || !newTodo.content || isPostNewTodoPending}
          buttonText={isPostNewTodoPending ? "추가 중..." : "추가"}
        />
      </div>
    </form>
  );
};
export default TodoAdd;
