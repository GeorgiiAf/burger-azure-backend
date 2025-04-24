import express from 'express';
import {
  getAllProducts,
  getProduct,
  ProductByType,
  addProduct,
  deleteProduct,
  updateProduct,
  addProductAllergy,
  removeProductAllergy,
  getProductAllergies,
  addAllergy,
  listAllergies,
} from '../controllers/product-controller.js';

const router = express.Router();

router.route('/allergies').post(addAllergy).get(listAllergies);

router
  .route('/:id/allergies')
  .get(getProductAllergies)
  .post(addProductAllergy)
  .delete(removeProductAllergy);

// Route for getting all products and adding a new product
router.route('/').get(getAllProducts).post(addProduct);

// Route for getting products by type
router.get('/type/:type', ProductByType);

// Route for getting a single product, deleting a product and updating a product
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
