export type UserRole = "petani" | "pemilik_marketplace" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
