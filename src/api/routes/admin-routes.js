import express from 'express';
import {authAdminToken} from '../middlewares/auth-middleware.js';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product-controller.js';

const adminRouter = express.Router();

adminRouter.route('/').get(authAdminToken, (req, res) => {
  res.json({user: req.user});
});

adminRouter.post('/products', authAdminToken, addProduct);

adminRouter
  .route('/products/:id')
  .delete(authAdminToken, deleteProduct)
  .put(authAdminToken, updateProduct);

export default adminRouter;
