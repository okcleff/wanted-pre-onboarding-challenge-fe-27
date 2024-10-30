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

export interface CreateTodoResponse {
  data: TodoItem;
}
export interface UpdateTodoResponse {
  data: TodoItem;
}

export interface DeleteTodoResponse {
  data: null;
}
