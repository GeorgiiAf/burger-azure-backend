import {AuthService} from '../../services/auth.js';

/**
 * Handles user login
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export async function login(req, res, next) {
  try {
    const {email, password} = req.body;

    const authResponse = await AuthService.login(email, password);

    res.json(authResponse);
  } catch (error) {
    next(error);
  }
}
