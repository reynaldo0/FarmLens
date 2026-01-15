import Cookies from "js-cookie";
import type { AuthUser } from "../types/auth";

const COOKIE_KEY = "auth_user";

export const setAuth = (user: AuthUser): void => {
  Cookies.set(COOKIE_KEY, JSON.stringify(user), { expires: 1 });
};

export const getAuth = (): AuthUser | null => {
  const data = Cookies.get(COOKIE_KEY);
  return data ? (JSON.parse(data) as AuthUser) : null;
};

export const removeAuth = (): void => {
  Cookies.remove(COOKIE_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!Cookies.get(COOKIE_KEY);
};
