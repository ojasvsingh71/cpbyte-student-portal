const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES = '30m'; 
const REFRESH_TOKEN_DAYS = 30;

function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex'); 
}
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
function generateAccessToken(user) {
  return jwt.sign(    { userId: user.id, library_id: user.library_id, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES });
}
module.exports = { generateRefreshToken, hashToken, generateAccessToken, REFRESH_TOKEN_DAYS, ACCESS_TOKEN_EXPIRES};
