
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, updateTodoAsync } from '../store/todosSlice';
import { RootState } from '../store/store';
import { Todo } from '../types/todo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AppDispatch } from '../store/store';

interface TodoFormProps {
  todo?: Todo;
  open: boolean;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.items);
  const [formData, setFormData] = React.useState({
    title: todo?.title || '',
    description: todo?.description || '',
    dueDate: todo?.dueDate || '',
    category: todo?.category || categories[0]?.id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      id: todo?.id || crypto.randomUUID(),
      ...formData,
      completed: todo?.completed || false,
      createdAt: todo?.createdAt || new Date().toISOString(),
    };
    
    if (todo) {
      dispatch(updateTodoAsync(newTodo));
      toast.success("Todo updated successfully");
    } else {
      dispatch(addTodoAsync(newTodo));
      toast.success("Todo added successfully");
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name || 'default value'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {todo ? 'Update' : 'Add'} Todo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
