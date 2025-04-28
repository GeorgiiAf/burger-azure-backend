import express from 'express';
import {login, register} from '../controllers/auth-controller.js';
import {validateRegister} from '../middlewares/auth-middleware.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegister, register);

authRouter.post('/login', login);

export default authRouter;
