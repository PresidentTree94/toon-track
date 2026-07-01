import { useMemo, useState } from "react";

export function useSorter<T>(
  items: T[],
  getSeries: (item: T) => string,
  getSubs: (item: T) => number,
  getGrowth: (item: T) => number
) {
  const [sortKey, setSortKey] = useState<"series" | "subs" | "growth">("subs");

  const sortedWebtoons = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortKey === "series") return getSeries(a).localeCompare(getSeries(b));
      if (sortKey === "subs") return getSubs(b) - getSubs(a);
      if (sortKey === "growth") return getGrowth(b) - getGrowth(a);
      return 0;
    });
  }, [items, sortKey, getSeries, getSubs, getGrowth]);

  return { sortedWebtoons, sortKey, setSortKey };
}
