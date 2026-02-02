import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import type { AuthUser, UserRole } from "../types/auth";
import { addUser, findUserByEmail, ensureSeedUsers } from "./userStore";

const COOKIE_KEY = "auth_user_v1";

// session tanpa passwordHash (lebih aman)
export type AuthSessionUser = Omit<AuthUser, "passwordHash">;

function safeUUID() {
  // fallback untuk browser yang gak support crypto.randomUUID
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `u_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

// simpan session
export function setAuth(user: AuthUser): void {
  const sessionUser: AuthSessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  Cookies.set(COOKIE_KEY, JSON.stringify(sessionUser), { expires: 1 });
}

// REGISTER
export function register(
  name: string,
  email: string,
  password: string,
  role: UserRole
): AuthUser | null {
  ensureSeedUsers();

  const existing = findUserByEmail(email);
  if (existing) return null;

  const passwordHash = bcrypt.hashSync(password, 8);

  const newUser: AuthUser = {
    id: safeUUID(),
    name,
    email,
    passwordHash,
    role,
  };

  addUser(newUser);
  setAuth(newUser);
  return newUser;
}

// LOGIN
export function login(email: string, password: string): AuthUser | null {
  ensureSeedUsers();

  const user = findUserByEmail(email);
  if (!user) return null;

  // ✅ user.passwordHash sekarang pasti string
  const match = bcrypt.compareSync(password, user.passwordHash);
  if (!match) return null;

  setAuth(user);
  return user;
}

// SESSION
export function getAuth(): AuthSessionUser | null {
  const data = Cookies.get(COOKIE_KEY);
  return data ? (JSON.parse(data) as AuthSessionUser) : null;
}

export function removeAuth(): void {
  Cookies.remove(COOKIE_KEY);
}

export function isAuthenticated(): boolean {
  return !!Cookies.get(COOKIE_KEY);
}
