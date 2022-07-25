import axios from 'src/api/';

export const postStatusToTrue = async (todolistId: string, todoId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(
      `/todolist/status_to_true/${todolistId}/${todoId}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postStatusToFalse = async (todolistId: string, todoId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(
      `/todolist/status_to_false/${todolistId}/${todoId}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
