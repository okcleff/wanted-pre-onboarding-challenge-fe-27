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

export interface DeleteTodoResponse {
  data: null;
}
