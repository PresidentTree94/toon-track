import { Toon } from "@/types/toon";

export function median(values: number[]) {
  const sorted = values.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function condenseValue(value: number) {
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  } else {
    return Math.abs(value) > 0 && Math.abs(value) < 1 ? value.toFixed(1) : value.toFixed(0);
  }
}

export function calcMedianGrowth(pastSubscribers: number, latestSubscribers: number) {
  return ((latestSubscribers - pastSubscribers) / pastSubscribers) * 100;
}

export function calcSubChange(pastSubscribers: number, latestSubscribers: number) {
  return latestSubscribers - pastSubscribers;
}

export function calcMedianGrowthTimeline(database: Toon[]) {
  const monthlyMedianGrowths: Record<string, number[]> = {};
  for (const toon of database) {
    for (let i = 1; i < toon.data.length; i++) {
      const past = toon.data[i - 1], latest = toon.data[i];
      (monthlyMedianGrowths[latest.month] ??= []).push(calcMedianGrowth(past.value, latest.value));
    }
  }
  return Object.entries(monthlyMedianGrowths).map(([month, values]) => ({month, value: median(values)}));
}

export function calcMedianSubsTimeline(database: Toon[]) {
  const monthlyMediaSubs: Record<string, number[]> = {};
  for (const toon of database) {
    for (let i = 0; i < toon.data.length; i++) {
      (monthlyMediaSubs[toon.data[i].month] ??= []).push(toon.data[i].value);
    }
  }
  return Object.entries(monthlyMediaSubs).map(([month, values]) => ({month, value: median(values)}));
}

export function calcSubChangeTimeline(database: Toon[]) {
  const monthlySubChanges: Record<string, number[]> = {};
  for (const toon of database) {
    for (let i = 1; i < toon.data.length; i++) {
      const past = toon.data[i - 1], latest = toon.data[i];
      (monthlySubChanges[toon.data[i].month] ??= []).push(latest.value - past.value);
    }
  }
  return Object.entries(monthlySubChanges).map(([month, values]) => ({month, value: median(values)}));
}

export function groupByTitle(data: { timestamp: string; snapshot: { title: string; value: number }[] }[]) {
  const grouped: Record<string, { month: string; value: number }[]> = {};

  for (const { timestamp, snapshot } of data) {
    for (const { title, value } of snapshot) {
      (grouped[title] ??= []).push({ month: timestamp, value });
    }
  }

  return grouped;
}

export function getDataForMonth(growthData: Record<string, { month: string; growth: number }[]>, targetMonth: string) {
  return Object.values(growthData)
    .flatMap(entries => {
      const found = entries.find(e => e.month === targetMonth);
      return found ? [found.growth] : [];
    });
}

export function buildGrowthMap(
  data: Record<string, { month: string; value: number }[]>,
  compute: (prev: { month: string; value: number } | null, curr: { month: string; value: number }) => number,
  startIndex: number
) {
  const result: Record<string, { month: string; growth: number }[]> = {};

  for (const title in data) {
    const entries = data[title];

    if (entries.length <= startIndex) {
      result[title] = [];
      continue;
    }

    const growth: { month: string; growth: number }[] = [];

    for (let i = startIndex; i < entries.length; i++) {
      const prev = startIndex === 0 ? null : entries[i - 1];
      const curr = entries[i];

      growth.push({
        month: curr.month,
        growth: compute(prev, curr),
      });
    }

    result[title] = growth;
  }

  return result;
}