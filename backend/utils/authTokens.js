import crypto from "crypto";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
export const ACCESS_TOKEN_EXPIRES = 30; 
export const REFRESH_TOKEN_DAYS = 30;

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex'); 
}
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
export function generateAccessToken(user) {
  return jwt.sign(    
    { 
      userId: user.id, 
      library_id: user.library_id, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '30m' 
    }
  );
}

