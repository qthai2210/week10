import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTodos = async () => {
  const response = await api.get("/todos");

  return response.data;
};

export const updateTodoStatus = async (todoId) => {
  try {
    const response = await api.patch(`/todos/${todoId}/toggle`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Todo not found");
    }
    throw new Error("Failed to update todo");
  }
};

export const addTodo = async (title) => {
  console.log("title", title);
  const response = await api.post("/todos", { title });
  console.log("response1", response);
  return response.data;
};
export default api;
