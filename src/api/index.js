import express from 'express';
import productRouter from './routes/productRouter.js';
import authRouter from './routes/auth-routes.js';
import adminRouter from './routes/admin-routes.js';
import orderRouter from './routes/order-routes.js';
import userRouter from './routes/user-routes.js';

const router = express.Router();

router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/order', orderRouter); // Mount orderRouter under /order
router.use('/account', userRouter);

export default router;
