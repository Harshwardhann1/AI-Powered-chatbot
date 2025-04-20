import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateJWT = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const generateResetToken = (): { token: string; expiry: Date } => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600000); // 1 hour
  return { token, expiry };
};
