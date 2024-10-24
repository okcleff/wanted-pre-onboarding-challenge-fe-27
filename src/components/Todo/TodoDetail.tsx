import React, { useState, useEffect } from "react";
import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import { useUpdateTodo, useDeleteTodo } from "../../queries/todo";
import type { TodoItem } from "../../types/todo";

type TodoDetailProps = {
  selectedTodo: TodoItem | null;
  setSelectedTodo: (todo: TodoItem | null) => void;
};

const TodoDetail: React.FC<TodoDetailProps> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [selectedTodo?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTodo) return;
    const { name, value } = e.target;

    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
    });
  };

  const { mutate: updateTodo, isPending: isUpdatedTodoPending } =
    useUpdateTodo();

  const handleUpdateTodo = () => {
    if (!selectedTodo) return;
    updateTodo(selectedTodo);
    setEditMode(false);
  };

  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = () => {
    if (!selectedTodo) return;
    deleteTodo(selectedTodo.id);
    setSelectedTodo(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">상세 정보</h2>
      {selectedTodo && (
        <div className="border p-4 rounded">
          {editMode ? (
            <form onSubmit={handleUpdateTodo}>
              <CommonInput
                type="text"
                name="title"
                value={selectedTodo.title}
                onChange={handleInputChange}
              />
              <CommonInput
                type="text"
                name="content"
                value={selectedTodo.content}
                onChange={handleInputChange}
              />

              <div className="flex justify-end gap-3 mt-5">
                <CommonButton
                  type="submit"
                  buttonText="저장"
                  disabled={
                    !selectedTodo.title ||
                    !selectedTodo.content ||
                    isUpdatedTodoPending
                  }
                />
                <CommonButton
                  type="button"
                  onClick={handleDeleteTodo}
                  className="bg-red-500 hover:bg-red-600"
                  buttonText="삭제"
                />
                <CommonButton
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-white text-black"
                  buttonText="취소"
                />
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedTodo.title}
              </h3>

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
      )}
    </div>
  );
};
export default TodoDetail;
