import React from "react";

import { TODO_PRIORITY_LABEL } from "../../constants";
import type { TodoPriority } from "../../types/todo";

interface TodoPriorityLabelProps {
  priority: TodoPriority;
}

const TodoPriorityLabel: React.FC<TodoPriorityLabelProps> = ({ priority }) => {
  const currentPriority = TODO_PRIORITY_LABEL[priority];
  const { label, color } = currentPriority;

  return (
    <span className={`px-2 py-0.5 rounded font-semibold ${color}`}>
      {label}
    </span>
  );
};
export default TodoPriorityLabel;
