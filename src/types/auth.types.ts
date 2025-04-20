export interface AuthPayload {
  username?: string;
  email: string;
  password?: string;
}

export interface UpdateProfilePayload {
  username?: string;
  email?: string;
}