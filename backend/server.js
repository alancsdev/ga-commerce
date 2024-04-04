import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const port = process.env.PORT || 3000;
import productRouter from './routes/productsRoutes.js';
import userRouter from './routes/usersRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
