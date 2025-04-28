import express from 'express';
import {authAdminToken} from '../middlewares/auth-middleware.js';

const adminRouter = express.Router();

adminRouter.get('/', authAdminToken, (req, res) => {
  res.json({message: 'Valid', user: req.user});
});

export default adminRouter;
