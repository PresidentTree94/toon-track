import { Toon } from "@/types/toon";

export function median(values: number[]) {
  const sorted = values.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function condenseValue(value: number) {
  if (value >= 1000000) {
    return (value / 1000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  } else {
    return value.toFixed(0);
  }
}

export function calcMedianGrowth(pastSubscribers: number, latestSubscribers: number) {
  return Number((((latestSubscribers - pastSubscribers) / pastSubscribers) * 100).toFixed(0));
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