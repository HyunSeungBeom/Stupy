import axios from 'src/api/';
import { GetTodolist } from './types';

export const getTodolist = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<GetTodolist>('/todolist/');
    return res.data;
  } catch (err) {
    throw err;
  }
};
