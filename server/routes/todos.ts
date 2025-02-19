
import express from 'express';
import { Todo } from '../models/Todo';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create todo
router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ id: req.params.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
