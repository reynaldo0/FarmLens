export type MarketplaceProfile = {
  ownerId: string;
  namaToko: string;
  provinsi?: string;
  kota?: string;
  createdAt: string;
};

function key(ownerId: string) {
  return `marketplace_profile:${ownerId}`;
}

export function getMarketplaceProfile(
  ownerId: string,
): MarketplaceProfile | null {
  const raw = localStorage.getItem(key(ownerId));
  return raw ? (JSON.parse(raw) as MarketplaceProfile) : null;
}

export function setMarketplaceProfile(profile: MarketplaceProfile) {
  localStorage.setItem(key(profile.ownerId), JSON.stringify(profile));
}

export function hasMarketplace(ownerId: string): boolean {
  return !!getMarketplaceProfile(ownerId);
}

export function removeMarketplaceProfile(ownerId: string) {
  localStorage.removeItem(key(ownerId));
}
