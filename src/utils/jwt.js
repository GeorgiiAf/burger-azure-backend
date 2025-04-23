import jwt from 'jsonwebtoken';
import {config} from '../config/jwt.js';

export const generateTokens = (user) => {
  return {
    accessToken: jwt.sign(user, config.JWT_SECRET, {expiresIn: '15m'}),
  };
};
