import express from 'express';
import {
  getAllProducts,
  getProduct,
  ProductByType,
  addProduct,
  deleteProduct,
} from '../controllers/product-controller.js';

const router = express.Router();

// Route for getting all products and adding a new product
router.route('/')
  .get(getAllProducts)
  .post(addProduct);

// Route for getting products by type
router.get('/type/:type', ProductByType);

// Route for getting a single product and deleting a product
router.route('/:id')
  .get(getProduct)
  .delete(deleteProduct);

export default router;
