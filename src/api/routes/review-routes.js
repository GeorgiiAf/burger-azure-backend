import express from 'express';
import { createReview, getAllReviewsController } from '../controllers/review-controller.js';

const router = express.Router();

router.post('/', createReview);

router.get('/', getAllReviewsController);

export default router;
