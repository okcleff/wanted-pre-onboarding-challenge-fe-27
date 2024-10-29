export type NewTodo = {
  title: string;
  content: string;
};

export type TodoItem = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodoResponse = TodoItem[];

export type CreateTodoResponse = { data: TodoItem };
export type UpdateTodoResponse = { data: TodoItem };

export type TodoError = {
  code: string;
  message: string;
  response?: {
    status: number;
    data: {
      details: string;
    };
  };
};
