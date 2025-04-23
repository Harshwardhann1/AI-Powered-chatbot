import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateJWT, generateResetToken } from '../utils/tokens';
import { AuthPayload, UpdateProfilePayload } from '../types/auth.types';
import { sendEmail } from './email.service';

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

    // Generate the reset link
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const htmlContent = `
      <h2>Reset Your Password</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail(email, 'Password Reset Request', htmlContent);
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