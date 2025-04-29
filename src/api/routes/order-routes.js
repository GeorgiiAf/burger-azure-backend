import express from 'express';
import {
  createNewOrder,
  getOrder,
  getAllOrders,
} from '../controllers/order-controller.js';

const router = express.Router();

// Route for creating a new order and fetching all orders
router.route('/orders').post(createNewOrder).get(getAllOrders);

// Route for fetching a specific order by ID
router.get('/orders/:id', getOrder);

export default router;
