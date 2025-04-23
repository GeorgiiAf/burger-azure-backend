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
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} [name]
 */

export {};
