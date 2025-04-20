import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);
export const comparePassword = (input: string, hash: string): Promise<boolean> => bcrypt.compare(input, hash);