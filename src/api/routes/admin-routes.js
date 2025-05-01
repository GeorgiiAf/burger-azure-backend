import express from 'express';
import {authAdminToken} from '../middlewares/auth-middleware.js';
import {
  deleteProduct,
  updateProduct,
} from '../controllers/product-controller.js';

const adminRouter = express.Router();

adminRouter.get('/', authAdminToken, (req, res) => {
  res.json({user: req.user});
});

adminRouter
  .route('/products/:id')
  .delete(authAdminToken, deleteProduct)
  .put(authAdminToken, updateProduct);

export default adminRouter;
