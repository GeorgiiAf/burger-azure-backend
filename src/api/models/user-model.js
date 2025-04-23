import promisePool from '../../utils/database.js';

/**
 * @typedef {import('../interfaces/auth-interfaces.js').newUser} newUser
 */

/**
 * Finds a user by email
 * @param {string} email
 * @returns {Promise<object|null>}
 */
const findByEmail = async (email) => {
  const user = await promisePool.execute('SELECT * FROM User');
  console.log(user);
  return user;
};

/**
 * Finds a user by email
 * @param {string} email
 * @returns {Promise<object|null>}
 */
const findByUsername = async (username) => {
  const user = await promisePool.execute('SELECT username FROM User');
  console.log(user);
  return user;
};

/**
 * Creates a new user
 * @param {newUser} newUser
 * @returns {Promise<object|null>}
 */
const createUser = async (newUser) => {
  try {
    const [result] = await promisePool.execute(
      'INSERT INTO users (email, username) VALUES (?, ?)',
      [newUser.email, newUser.username]
    );
    return result;
  } catch (e) {
    throw new Error(`Database error -> ${e}`);
  }
};

export {findByEmail, findByUsername, createUser};
