import { Router } from 'express';
import {
  signup,
  login,
  forgotPassword,
  updateProfile,
  resetPassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// ✅ Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// 🔐 Protected route (requires JWT)
router.put('/update-profile', authenticate, updateProfile);

export default router;
