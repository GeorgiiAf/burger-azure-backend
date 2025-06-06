/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} accessToken
 * @property {string} [refreshToken]
 * @property {User} user
 */

/**
 * @typedef {Object} newUser
 * @property {string} email
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {number} role
 * @property {string} email
 * @property {string} username
 * @property {string} password
 */

export {};
