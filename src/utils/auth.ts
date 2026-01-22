import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import type { AuthUser } from "../types/auth";
import { addUser, findUserByEmail } from "./userStore";

const COOKIE_KEY = "auth_user";

// simpan session
export function setAuth(user: AuthUser): void {
  const sessionUser = { ...user, passwordHash: "" };
  Cookies.set(COOKIE_KEY, JSON.stringify(sessionUser), { expires: 1 });
}

// REGISTER
export function register(
  name: string,
  email: string,
  password: string,
  role: AuthUser["role"],
): AuthUser | null {
  const existing = findUserByEmail(email);
  if (existing) return null;

  const passwordHash = bcrypt.hashSync(password, 8);

  const newUser: AuthUser = {
    id: crypto.randomUUID(),
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
  const user = findUserByEmail(email);
  if (!user) return null;

  const match = bcrypt.compareSync(password, user.passwordHash);
  if (!match) return null;

  setAuth(user);
  return user;
}

// SESSION
export function getAuth(): AuthUser | null {
  const data = Cookies.get(COOKIE_KEY);
  return data ? (JSON.parse(data) as AuthUser) : null;
}

export function removeAuth(): void {
  Cookies.remove(COOKIE_KEY);
}

export function isAuthenticated(): boolean {
  return !!Cookies.get(COOKIE_KEY);
}
