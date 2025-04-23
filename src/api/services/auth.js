import {findByUsername, createUser} from '../models/user-model.js';
import {comparePassword, hashPassword} from './crypto.js';
import {generateTokens} from './tokenService.js';
import UserModel from './userModel.js';

/**
 * @typedef {import('../interfaces/auth-interfaces.js').User} User
 * @typedef {import('../interfaces/auth-interfaces.js').LoginPayload} LoginPayload
 */

export class AuthService {
  /**
   * Authenticates a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ accessToken: string, user: object }>}
   */
  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = generateTokens({id: user.id, email: user.email});

    const {password_hash, ...safeUserData} = user;
    return {accessToken, user: safeUserData};
  }

  /**
   * Authenticates a user
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @returns {Promise<{ accessToken: string, user: object }>}
   */
  static async register(email, password, username) {
    const userEmail = await UserModel.findByEmail(email);
    if (userEmail) throw new Error('Email taken');

    const userUsername = await findByUsername(username);
    if (userUsername) throw new Error('Username taken');

    const hashedPassword = await hashPassword(password);

    /** @type {newUser} */
    const newUser = {
      email: email,
      username: username,
      password: hashedPassword,
    };

    const res = await createUser(newUser);

    return res;
  }
}
