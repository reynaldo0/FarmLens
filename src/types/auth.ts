export type UserRole = "petani" | "pembeli" | "admin";

export interface AuthUser {
  name?: string;
  email: string;
  role: UserRole;
}
