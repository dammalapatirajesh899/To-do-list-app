
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteTodoAsync, updateTodoAsync } from '../store/todosSlice';
import { Todo } from '../types/todo';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'framer-motion';
import { AppDispatch } from '../store/store';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const sort = useSelector((state: RootState) => state.todos.sort);
  const categories = useSelector((state: RootState) => state.categories.items);

  const filteredAndSortedTodos = React.useMemo(() => {
    let filtered = todos;
    if (filter === 'active') {
      filtered = todos.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filtered = todos.filter((todo) => todo.completed);
    }

    return filtered.sort((a, b) => {
      if (sort === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [todos, filter, sort]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleToggle = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      dispatch(updateTodoAsync({ ...todo, completed: !todo.completed }));
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {filteredAndSortedTodos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-4 shadow-sm border border-gray-200/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggle(todo.id)}
                />
                <div className="space-y-1">
                  <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </h3>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-primary/10 rounded-full">
                      {getCategoryName(todo.category)}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(todo)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
