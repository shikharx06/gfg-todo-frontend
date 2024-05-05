import { axiosInstance } from '.';

export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get('/todo');
    const todos = response.data?.data;
    return todos ?? [];
  } catch (err) {
    console.error(err);
  }
};
