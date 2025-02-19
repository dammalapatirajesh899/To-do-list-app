
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todos';
import categoryRoutes from './routes/categories';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:8082', 'another-allowed-origin.com']
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});
app.options('*', cors()); // include before other routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
