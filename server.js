import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const port = process.env.PORT || 3000;
import productRouter from './routes/productsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
