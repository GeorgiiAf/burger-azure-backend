import express from 'express';
import {login, register} from '../controllers/auth-controller';
import {
  validateRegister,
  authenticateToken,
} from '../middlewares/auth-middleware';

const authRouter = express.Router();

authRouter.post('/register', validateRegister, register);

authRouter.post('/login', login);

authRouter.get('/crm', authenticateToken);

export default authRouter;
