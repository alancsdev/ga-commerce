import productController from '../controllers/products.js';
import { Router } from 'express';
const router = Router();

router.get('/', productController.index);

router.get('/:id', productController.find);

export default router;
