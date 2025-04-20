export const sendResetEmail = async (email: string, token: string): Promise<void> => {
  console.log(`📧 Send reset token to ${email}: ${token}`);
  // In production, use nodemailer/SendGrid/etc
};