export type GetTodolist = {
  todoListId: string;
  title: string;
  userId: string;
  todos: {
    content: string;
    status: boolean;
    createdAt: string;
    _id: string;
  }[];
}[];
