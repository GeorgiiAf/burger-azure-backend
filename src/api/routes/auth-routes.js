import express from 'express';
import {login, register} from '../controllers/auth-controller.js';
import {
  validateRegister,
  authenticateToken,
} from '../middlewares/auth-middleware.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegister, register);

authRouter.post('/login', login);

authRouter.get('/crm', authenticateToken);

export default authRouter;
