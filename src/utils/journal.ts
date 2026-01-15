export function groupByMonth(entries: any[]) {
  const map: Record<string, any[]> = {};

  entries.forEach((e) => {
    const month = e.dateISO.slice(0, 7);
    map[month] ??= [];
    map[month].push(e);
  });

  return Object.entries(map).map(([key, items]) => ({
    monthKey: key,
    monthLabel: new Date(key + "-01").toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    }),
    entries: items,
  }));
}
