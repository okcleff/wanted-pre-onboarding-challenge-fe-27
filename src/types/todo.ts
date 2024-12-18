export type TodoPriority = "urgent" | "normal" | "low";
export interface NewTodo {
  title: string;
  content: string;
  priority: TodoPriority;
}

export interface TodoItem {
  title: string;
  content: string;
  id: string;
  priority: TodoPriority;
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

export interface TodoFilters extends Record<string, string | undefined> {
  priorityFilter?: TodoPriority;
  keyword?: string;
  sort?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
}
