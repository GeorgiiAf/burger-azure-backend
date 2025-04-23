import {UserModel} from '../models/user.js';
import {comparePassword} from '../utils/crypto.js';
import {generateTokens} from '../utils/jwt.js';

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
}
