import { addReview } from '../models/review-model.js';

const createReview = async (req, res) => {
  try {
    const { reservation_id, opinion, stars } = req.body;

    // Validate input
    if (!reservation_id || !opinion || !stars) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: 'Stars must be between 1 and 5' });
    }

    const result = await addReview(reservation_id, opinion, stars);
    res.status(201).json({
      message: 'Review added successfully',
      reviewId: result.insertId,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createReview };
