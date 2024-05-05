import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5050',
  baseURL: 'https://gfg-todo-server.onrender.com'
});
