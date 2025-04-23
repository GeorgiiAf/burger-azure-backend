import express from 'express';
import productRouter from './routes/productRouter.js';
import authRouter from './routes/auth-routes.js';

const router = express.Router();

router.use('/products', productRouter);

router.use('/auth', authRouter);

export default router;
