import type { BmkgDaily } from "../types/weather";

export function toBmkgDaily(cuacaGroup: any[]): BmkgDaily[] {
  const flat = cuacaGroup.flat();
  const map: Record<string, number> = {};

  flat.forEach((d) => {
    if (!d?.local_datetime) return;
    const date = d.local_datetime.slice(0, 10);
    map[date] = (map[date] ?? 0) + (Number(d.tp) || 0);
  });

  return Object.entries(map)
    .map(([dateISO, rainMm]) => ({ dateISO, rainMm }))
    .slice(0, 7);
}
