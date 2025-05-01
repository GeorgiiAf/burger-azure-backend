import express from 'express';
import {authToken} from '../middlewares/auth-middleware.js';

const userRouter = express.Router();

userRouter.get('/', authToken, (req, res) => {
  res.json({user: req.user});
});

export default userRouter;
