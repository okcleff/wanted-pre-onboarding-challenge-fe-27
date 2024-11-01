export interface NewTodo {
  title: string;
  content: string;
}

export interface TodoItem {
  title: string;
  content: string;
  id: string;
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
