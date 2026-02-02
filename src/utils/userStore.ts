
import { dummyUsers } from "../data/dummyUsers";
import type { AuthUser } from "../types/auth";

const USERS_KEY = "farmlens_users_v1";

function readUsers(): AuthUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AuthUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureSeedUsers() {
  const existing = readUsers();
  if (existing.length > 0) return;
  writeUsers(dummyUsers);
}

export function getAllUsers(): AuthUser[] {
  ensureSeedUsers();
  return readUsers();
}

export function findUserByEmail(email: string): AuthUser | undefined {
  ensureSeedUsers();
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: AuthUser) {
  ensureSeedUsers();
  const users = readUsers();
  users.push(user);
  writeUsers(users);
}
