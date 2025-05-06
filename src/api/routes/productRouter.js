import express from 'express';
import {
  getAllProducts,
  getProduct,
  ProductByType,
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

// Route for getting all products
router.route('/').get(getAllProducts);

// Route for getting products by type
router.get('/type/:type', ProductByType);

// Route for getting a single product
router.route('/:id').get(getProduct);

export default router;
