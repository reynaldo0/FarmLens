import type { MarketplaceStore } from "../types/marketplaceOwner";

const STORE_KEY = "farmlens_marketplace_store_v1";

function readAll(): MarketplaceStore[] {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MarketplaceStore[];
  } catch {
    return [];
  }
}

function writeAll(items: MarketplaceStore[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

function safeUUID() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `s_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getStoreByOwner(ownerId: string): MarketplaceStore | undefined {
  return readAll().find((s) => s.ownerId === ownerId);
}

export function createOrUpdateStore(
  payload: Omit<MarketplaceStore, "id" | "createdAt"> & { id?: string },
) {
  const all = readAll();
  const existingIndex = all.findIndex((s) => s.ownerId === payload.ownerId);

  const store: MarketplaceStore = {
    id: payload.id ?? (existingIndex >= 0 ? all[existingIndex].id : safeUUID()),
    ownerId: payload.ownerId,
    namaToko: payload.namaToko,
    deskripsi: payload.deskripsi,
    provinceCode: payload.provinceCode,
    alamat: payload.alamat,
    telepon: payload.telepon,
    createdAt:
      existingIndex >= 0
        ? all[existingIndex].createdAt
        : new Date().toISOString(),
  };

  if (existingIndex >= 0) all[existingIndex] = store;
  else all.push(store);

  writeAll(all);
  return store;
}
