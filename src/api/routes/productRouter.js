import express from 'express';
import {
  getAllProducts,
  getProduct,
  ProductByType,
} from '../controllers/product-controller.js';

const productRouter = express.Router();

productRouter.get('/products', getAllProducts);

productRouter.route('/').get(getAllProducts);

productRouter.route('/:id').get(getProduct);
productRouter.route('/type/:type').get(ProductByType);

export default productRouter;
