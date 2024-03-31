import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productsController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
