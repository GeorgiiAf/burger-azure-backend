import express from 'express';
import {authToken} from '../middlewares/auth-middleware.js';
import {getAllUsers} from '../models/user-model.js';

const userRouter = express.Router();

// Get current user's profile
userRouter.get('/', authToken, (req, res) => {
  res.json({user: req.user});
});

// Get all users (admin only)
userRouter.get('/all', authToken, async (req, res, next) => {
  try {
    if (req.user.role !== 2) {
      return res.status(403).json({message: 'Unauthorized: Admin access required'});
    }

    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
