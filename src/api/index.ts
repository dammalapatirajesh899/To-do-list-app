
import axios from 'axios';
import { Todo, Category } from '../types/todo';

const API_URL = 'http://localhost:6000/api';

export const api = {
  // Todos
  getTodos: () => axios.get(`${API_URL}/todos`).then(res => res.data),
  createTodo: (todo: Omit<Todo, 'id'>) => axios.post(`${API_URL}/todos`, todo).then(res => res.data),
  updateTodo: (todo: Todo) => axios.patch(`${API_URL}/todos/${todo.id}`, todo).then(res => res.data),
  deleteTodo: (id: string) => axios.delete(`${API_URL}/todos/${id}`).then(res => res.data),
  
  // Categories
  getCategories: () => axios.get(`${API_URL}/categories`).then(res => res.data),
  createCategory: (category: Omit<Category, 'id'>) => axios.post(`${API_URL}/categories`, category).then(res => res.data),
  deleteCategory: (id: string) => axios.delete(`${API_URL}/categories/${id}`).then(res => res.data),
};
