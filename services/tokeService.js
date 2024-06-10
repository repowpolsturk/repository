const jwt = require('jsonwebtoken');
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, 'access-secret', { expiresIn: '15m' });
};
const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, 'refresh-secret', { expiresIn: '7d' });
};
module.exports = { createAccessToken, createRefreshToken };