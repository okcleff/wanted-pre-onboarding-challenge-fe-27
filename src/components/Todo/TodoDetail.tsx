import React, { useState } from "react";
import CommonInput from "../common/CommonInput";
import { useUpdateTodo } from "../../queries/todo";
import { TodoItem } from "../../types/todo";

type TodoDetailProps = {
  selectedTodo: TodoItem | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<TodoItem | null>>;
};

const TodoDetail: React.FC<TodoDetailProps> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTodo) return;
    const { name, value } = e.target;

    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
    });
  };

  const { mutate: updateTodo } = useUpdateTodo();

  const handleUpdateTodo = () => {
    if (!selectedTodo) return;
    updateTodo(selectedTodo);
    setEditMode(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">상세 정보</h2>
      {selectedTodo && (
        <div className="border p-4 rounded">
          {editMode ? (
            <div>
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
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateTodo}
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
  );
};
export default TodoDetail;
