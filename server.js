import express from 'express';
const port = process.env.PORT || 3001;
import productRouter from './src/routes/products.js';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
