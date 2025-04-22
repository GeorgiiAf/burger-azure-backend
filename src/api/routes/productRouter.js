import express from 'express';
import {
  getAllProducts,
  getProduct,
  ProductByType,
} from '../controllers/product-controller.js';

const router = express.Router();

router.get('/products', getAllProducts);

router.route('/').get(getAllProducts);

router.route('/:id').get(getProduct);
router.route('/type/:type').get(ProductByType);

export default router;
