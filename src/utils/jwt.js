import jwt from 'jsonwebtoken';
import {config} from '../config/jwt.js';

export const generateTokens = (user) => {
  const token = jwt.sign(user, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return token;
};
