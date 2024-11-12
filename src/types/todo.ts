export interface NewTodo {
  title: string;
  content: string;
  priority: "urgent" | "normal" | "low";
}

export interface TodoItem {
  title: string;
  content: string;
  id: string;
  priority: "urgent" | "normal" | "low";
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  data: TodoItem[];
}

export interface TodoItemResponse {
  data: TodoItem;
}

export interface DeleteTodoResponse {
  data: null;
}
