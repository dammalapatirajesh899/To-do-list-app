
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { setFilter, setSort } from '../store/todosSlice';
import { Todo } from '../types/todo';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const TodoApp = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<Todo | undefined>();
  const filter = useSelector((state: any) => state.todos.filter);
  const sort = useSelector((state: any) => state.todos.sort);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-gray-400">Organize your tasks efficiently</p>
          </div>
          
          <div className="flex justify-between items-center" style={{color:"black"}} >
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => dispatch(setFilter('all'))}
              >
                All
              </Button>
              <Button
                variant={filter === 'active' ? 'default' : 'outline'}
                onClick={() => dispatch(setFilter('active'))}
              >
                Active
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => dispatch(setFilter('completed'))}
              >
                Completed
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={sort === 'dueDate' ? 'default' : 'outline'}
                onClick={() => dispatch(setSort('dueDate'))}
              >
                Sort by Due Date
              </Button>
              <Button
                variant={sort === 'createdAt' ? 'default' : 'outline'}
                onClick={() => dispatch(setSort('createdAt'))}
              >
                Sort by Created Date
              </Button>
            </div>
          </div>

          <Button
            onClick={() => {
              setEditingTodo(undefined);
              setIsFormOpen(true);
            }}
            className="w-full"
          >
            Add New Todo
          </Button>

          <TodoList onEdit={handleEdit} />
        </div>

        <TodoForm
          todo={editingTodo}
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(undefined);
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};

const Index = () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

export default Index;
