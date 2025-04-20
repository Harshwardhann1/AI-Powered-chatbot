import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  signupSchema,
  loginSchema,
  forgotSchema,
  updateSchema,
} from '../validations/auth.validation';

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  try {
    await AuthService.signup(req.body);
    res.status(201).json({ message: 'Signup successful' });
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  try {
    const token = await AuthService.login(req.body);
    res.json({ token });
  } catch (err: any) {
    console.log('This is the error______',err)
    res.status(401).json({ message: err.message });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error } = forgotSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  try {
    await AuthService.forgotPassword(req.body.email);
    res.json({ message: 'Reset email sent' });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  try {
    await AuthService.updateProfile((req as any).user.id, req.body);
    res.json({ message: 'Profile updated' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ message: 'Token and password required' });

  try {
    await AuthService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
