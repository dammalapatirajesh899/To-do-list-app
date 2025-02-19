
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';
import { api } from '../api';
import { toast } from 'sonner';

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  sort: 'dueDate' | 'createdAt';
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  sort: 'dueDate',
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await api.getTodos();
  return response;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (todo: Omit<Todo, 'id'>) => {
  const response = await api.createTodo(todo);
  return response;
});

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
  const response = await api.updateTodo(todo);
  return response;
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await api.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<'dueDate' | 'createdAt'>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
        toast.error(state.error);
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Todo added successfully');
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        toast.success('Todo updated successfully');
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
        toast.success('Todo deleted successfully');
      });
  },
});

export const { setFilter, setSort } = todosSlice.actions;
export default todosSlice.reducer;
