import express from 'express';
import {authAdminToken} from '../middlewares/auth-middleware.js';
import {deleteProduct} from '../controllers/product-controller.js';

const adminRouter = express.Router();

adminRouter.get('/', authAdminToken, (req, res) => {
  res.json({message: 'Valid', user: req.user});
});

adminRouter.delete('/products/:id', authAdminToken, deleteProduct);

export default adminRouter;
