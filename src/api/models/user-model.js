import promisePool from '../../utils/database.js';

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

export {findByEmail};
