import type { AuthUser } from "../types/auth";

const DB_KEY = "farmlens_users";

// ambil semua user
export function getUsers(): AuthUser[] {
  const data = localStorage.getItem(DB_KEY);
  return data ? (JSON.parse(data) as AuthUser[]) : [];
}

// simpan semua user
function saveUsers(users: AuthUser[]) {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// tambah user baru
export function addUser(user: AuthUser) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

// cari user by email
export function findUserByEmail(email: string): AuthUser | undefined {
  return getUsers().find((u) => u.email === email);
}
