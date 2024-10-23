export type NewTodo = {
  title: string;
  content: string;
};

export type TodoReturnType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdatedTodoItem = NewTodo & { id: string };

export type GetTodoResponse = TodoReturnType[];

export type CreateTodoResponse = TodoReturnType;
export type UpdateTodoResponse = TodoReturnType;

export type TodoError = {
  response: {
    status: number;
    data: {
      details: string;
    };
  };
};
