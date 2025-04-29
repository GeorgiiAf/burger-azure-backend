import {
  createOrder,
  getOrderById,
  getAllOrdersFromDB,
} from '../models/order-model.js';

const createNewOrder = async (req, res) => {
  try {
    const { user_id, items, price, status } = req.body;

    // Validate input
    if (!user_id || !items || !Array.isArray(items) || items.length === 0 || !price || !status) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // Validate each item
    for (const item of items) {
      if (!item.product_id || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          message: 'Each item must have product_id and valid quantity',
        });
      }
    }

    const orderId = await createOrder(user_id, items, price, status);
    res.status(201).json({
      message: 'Order created successfully',
      orderId,
    });
  } catch (error) {
    console.error('Error creating order:', error);

    if (error.message.startsWith('Product with ID')) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({message: 'Order not found'});
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersFromDB();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {createNewOrder, getOrder, getAllOrders};
