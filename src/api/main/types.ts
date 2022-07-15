export type GetMain = {
  userId: string;
  title: string;
  todos: {
    _id: string;
    content: string;
    status: boolean;
    createdAt: string;
  }[];
};
