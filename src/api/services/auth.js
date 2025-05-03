import {findByUsername, createUser, findByEmail} from '../models/user-model.js';
import {comparePassword, hashPassword} from '../../utils/crypto.js';
import {generateTokens} from '../../utils/jwt.js';

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
    const user = await findByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = generateTokens({
      id: user.ID,
      email: user.email,
      role: user.role,
    });

    const userData = {
      id: user.ID,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {accessToken, userData};
  }

  /**
   * Authenticates a user
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @returns {Promise<{ accessToken: string, user: object }>}
   */
  static async register(email, password, username) {
    const userEmail = await findByEmail(email);
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

    console.log('newUser -> ', newUser);

    const res = await createUser(newUser);

    return res;
  }
}
