import { Toon } from "@/types/toon";

export function median(values: number[]) {
  const sorted = values.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function condenseValue(value: number) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  } else {
    return value > 0 && value < 1 ? value.toFixed(1) : value.toFixed(0);
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