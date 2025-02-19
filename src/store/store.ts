
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import categoriesReducer from './categoriesSlice';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
