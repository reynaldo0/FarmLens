import type { UserRole } from "../types/auth";

export type OwnerListingStatus = "draft" | "active" | "archived";

export type OwnerListing = {
  id: string;
  ownerId: string;
  ownerRole: UserRole; // pemilik_marketplace/admin (buat audit ringan)
  komoditas: string;
  kategori: "hasil_tani" | "bibit" | "pupuk" | "alat" | "lainnya";
  lokasi: string;
  harga: number; // per unit
  stok: number;
  satuan: "kg" | "ton" | "pcs" | "pak" | "meter" | "botol" | "lainnya";
  kualitas?: string; // Grade A, Premium, dll
  deskripsi?: string;
  status: OwnerListingStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const KEY = "owner_marketplace_listings_v1";

function safeParse<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getOwnerListings(): OwnerListing[] {
  const raw = localStorage.getItem(KEY) ?? undefined;
  const data = safeParse<OwnerListing[]>(raw);
  return Array.isArray(data) ? data : [];
}

export function saveOwnerListings(items: OwnerListing[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function seedOwnerListingsIfEmpty(ownerId: string, ownerRole: UserRole) {
  const current = getOwnerListings();
  if (current.length > 0) return;

  const now = new Date().toISOString();
  const seed: OwnerListing[] = [
    {
      id: crypto.randomUUID(),
      ownerId,
      ownerRole,
      komoditas: "Cabai Merah Keriting",
      kategori: "hasil_tani",
      lokasi: "Malang, Jawa Timur",
      harga: 18000,
      stok: 250,
      satuan: "kg",
      kualitas: "Grade A",
      deskripsi: "Cabai segar, panen harian. Siap kirim.",
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      ownerId,
      ownerRole,
      komoditas: "Beras Premium",
      kategori: "hasil_tani",
      lokasi: "Karawang, Jawa Barat",
      harga: 12500,
      stok: 1200,
      satuan: "kg",
      kualitas: "Premium",
      deskripsi: "Beras pulen, cocok untuk retail & grosir.",
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      ownerId,
      ownerRole,
      komoditas: "Pupuk Kompos Organik",
      kategori: "pupuk",
      lokasi: "Bogor, Jawa Barat",
      harga: 8000,
      stok: 500,
      satuan: "kg",
      kualitas: "Organik",
      deskripsi: "Kompos matang, aman untuk sayur & buah.",
      status: "draft",
      createdAt: now,
      updatedAt: now,
    },
  ];

  saveOwnerListings(seed);
}

export function addOwnerListing(
  payload: Omit<OwnerListing, "id" | "createdAt" | "updatedAt">,
) {
  const items = getOwnerListings();
  const now = new Date().toISOString();
  const created: OwnerListing = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  saveOwnerListings([created, ...items]);
  return created;
}

export function updateOwnerListing(id: string, patch: Partial<OwnerListing>) {
  const items = getOwnerListings();
  const now = new Date().toISOString();
  const next = items.map((it) =>
    it.id === id ? { ...it, ...patch, id: it.id, updatedAt: now } : it,
  );
  saveOwnerListings(next);
  return next.find((x) => x.id === id) ?? null;
}

export function deleteOwnerListing(id: string) {
  const items = getOwnerListings();
  const next = items.filter((x) => x.id !== id);
  saveOwnerListings(next);
}
