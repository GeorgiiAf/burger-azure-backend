import promisePool from '../../utils/database.js';

/**
 * @typedef {import('../interfaces/auth-interfaces.js').newUser} newUser
 * @typedef {import('../interfaces/auth-interfaces.js').user} user
 */

/**
 * Finds a user by email
 * @param {string} email
 * @returns {Promise<user|null>}
 */
const findByEmail = async (email) => {
  const [user] = await promisePool.execute(
    'SELECT * FROM User WHERE email = ?',
    [email]
  );
  console.log(user);
  return user[0];
};

/**
 * Finds a user by email
 * @param {string} email
 * @returns {Promise<user|null>}
 */
const findByUsername = async (username) => {
  const [user] = await promisePool.execute(
    'SELECT * FROM User WHERE username = ?',
    [username]
  );
  console.log(user);
  return user[0];
};

/**
 * Gets all users
 * @returns {Promise<user[]>}
 */
const getAllUsers = async () => {
  const [users] = await promisePool.execute(
    'SELECT * FROM User'
  );
  return users;
};

/**
 * Creates a new user
 * @param {newUser} newUser
 * @returns {Promise<object|null>}
 */
const createUser = async (newUser) => {
  try {
    const [result] = await promisePool.execute(
      'INSERT INTO User (email, username, password, role) VALUES (?, ?, ?, ?)',
      [newUser.email, newUser.username, newUser.password, 3]
    );

    return result;
  } catch (e) {
    console.log(e.message);
    throw new Error(`Database error -> ${e}`);
  }
};

export {findByEmail, findByUsername, createUser, getAllUsers};
