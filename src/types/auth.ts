export type UserRole = "petani" | "pemilik_marketplace" | "pembeli" | "admin";

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}
