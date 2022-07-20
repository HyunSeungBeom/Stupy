import axios from 'src/api/';
import { GetTodolist, PostTodolistId } from './types';

export const getTodolist = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<GetTodolist>('/todolist/');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postTodolist = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post<GetTodolist>('/todolist/');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodolistId = async (todolistId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.delete<GetTodolist>(`/todolist/${todolistId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postTodolistId = async (todolistId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post<PostTodolistId>(`/todolist/${todolistId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodolistIdTodoId = async (
  todolistId: string,
  todoId: string,
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.delete<PostTodolistId>(
      `/todolist/${todolistId}/${todoId}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
