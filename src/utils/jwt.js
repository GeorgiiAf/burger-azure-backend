import jwt from 'jsonwebtoken';
import {config} from '../config/jwt';

export const generateTokens = (user) => {
  return {
    accessToken: jwt.sign(user, config.JWT_SECRET, config.JWT_EXPIRES_IN),
  };
};
