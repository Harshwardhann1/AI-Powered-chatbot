import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateJWT, generateResetToken } from '../utils/tokens';
import { sendResetEmail } from '../utils/email';
import { AuthPayload, UpdateProfilePayload } from '../types/auth.types';

export const AuthService = {
  async signup({ username, email, password }: AuthPayload) {
    const exists = await User.findOne({ where: { email } });
    if (exists) throw new Error('Email already in use');
    const hashed = await hashPassword(password!);
    await User.create({ username, email, password: hashed });
  },

  async login({ email, password }: AuthPayload) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password!, user.password))) {
      throw new Error('Invalid credentials');
    }
    return generateJWT(user.id);
  },

  async forgotPassword(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Email not found');
    const { token, expiry } = generateResetToken();
    await user.update({ resetToken: token, resetTokenExpiry: expiry });
    await sendResetEmail(email, token);
  },

  async updateProfile(userId: number, updates: UpdateProfilePayload) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.update(updates);
  },

  async resetPassword(token: string, newPassword: string) {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || user.resetTokenExpiry! < new Date()) {
      throw new Error('Token expired or invalid');
    }
  
    const hashed = await hashPassword(newPassword);
    await user.update({ password: hashed, resetToken: null, resetTokenExpiry: null });
  }
};