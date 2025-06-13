// types/auth.ts
export interface User {
  username: string;
  role: 'admin' | 'developer';
  loginTime: string;
}

export interface LoginData {
  username: string;
  password: string;
  role: 'admin' | 'developer';
}

export const validCredentials = {
  admin: { password: 'admin123', role: 'admin' as const },
  developer: { password: 'dev123', role: 'developer' as const }
};