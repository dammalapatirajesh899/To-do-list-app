
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

export const Todo = mongoose.model('Todo', todoSchema);
