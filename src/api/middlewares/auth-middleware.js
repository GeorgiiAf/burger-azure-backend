import jwt from 'jsonwebtoken';
import Joi from 'joi';
import {config} from '../../config/jwt.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const validateRegister = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);
  if (error) return res.status(400).json(error.message);
  next();
};
