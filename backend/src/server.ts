import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database'; 
import { errorHandler } from './middleware/errorHandler';

import auth from './routes/auth';
import todos from './routes/todos';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', auth);
app.use('/api/v1/todos', todos);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error, promise) => {
  console.log('Unhandled Rejection at:', promise, 'Reason:', err.message);
  server.close(() => {
    process.exit(1);
  });
});