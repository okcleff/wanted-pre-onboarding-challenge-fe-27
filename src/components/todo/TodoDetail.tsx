import React, { useState, useEffect } from "react";

import useHandleParams from "../../hooks/useHandleParams";
import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import CommonRadio from "../common/CommonRadio";
import TodoPriorityLabel from "./TodoPriorityLabel";
import { TODO_PRIORITY_OPTIONS } from "../../constants";
import {
  useGetTodoById,
  useUpdateTodo,
  useDeleteTodo,
} from "../../queries/todo";

const TodoDetail = () => {
  const { selectedParam: selectedTodoId } = useHandleParams("id");
  const { data: todo } = useGetTodoById(selectedTodoId as string);
  const { data: selectedTodo } = todo;

  const [editMode, setEditMode] = useState(false);

  // 할 일 입력값 변경 (수정 취소 했을 때 원래 값으로 되돌리기 위해 selectedTodo의 복사본 사용)
  const [editedTodo, setEditedTodo] = useState({ ...selectedTodo });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  // 선택한 할 일이 바뀌면 수정 모드를 끔
  useEffect(() => {
    setEditMode(false);
    setEditedTodo({ ...selectedTodo });
  }, [selectedTodo]);

  // 할 일 수정
  const { mutate: updateTodo, isPending: isUpdatedTodoPending } =
    useUpdateTodo();

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (window.confirm("수정하시겠습니까?")) {
      updateTodo(editedTodo, {
        onSuccess: () => setEditMode(false),
      });
    }
  };

  // 할 일 삭제
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodo();

  const handleDeleteTodo = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deleteTodo(selectedTodo.id);
  };

  // 취소 버튼 클릭
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTodo({ ...selectedTodo });
  };

  return (
    <>
      <div className="border p-4 rounded">
        {editMode ? (
          <form onSubmit={handleUpdateTodo}>
            <CommonInput
              type="text"
              name="title"
              value={editedTodo.title}
              onChange={handleInputChange}
              labelText="제목"
              inputClassName="py-2"
            />

            <CommonInput
              type="text"
              name="content"
              value={editedTodo.content}
              onChange={handleInputChange}
              labelText="내용"
              inputClassName="py-2"
            />

            <CommonRadio
              name="priority"
              options={TODO_PRIORITY_OPTIONS}
              value={editedTodo.priority}
              onChange={handleInputChange}
              fieldsetClassName="mt-2"
            />

            <div className="flex justify-end gap-3 mt-5">
              <CommonButton
                type="submit"
                buttonText="저장"
                disabled={
                  !editedTodo.title ||
                  !editedTodo.content ||
                  isUpdatedTodoPending
                }
              />
              <CommonButton
                type="button"
                onClick={handleDeleteTodo}
                className="bg-red-500 hover:bg-red-600"
                buttonText="삭제"
                disabled={isDeleteTodoPending}
              />
              <CommonButton
                type="button"
                onClick={handleCancelEdit}
                className="bg-white text-black border border-white hover:bg-white hover:border-gray-400"
                buttonText="취소"
              />
            </div>
          </form>
        ) : (
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{selectedTodo.title}</h3>
              {selectedTodo.priority && (
                <TodoPriorityLabel priority={selectedTodo.priority} />
              )}
            </div>

            <p>{selectedTodo.content}</p>

            <div className="flex justify-end gap-3 mt-5">
              <CommonButton
                type="button"
                onClick={() => setEditMode(true)}
                buttonText="수정"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default TodoDetail;
