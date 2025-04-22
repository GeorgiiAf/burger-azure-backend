import express from 'express';
import productRouter from './routes/productRouter.js';

const router = express.Router();

router.use('/products', productRouter);

export default router;
