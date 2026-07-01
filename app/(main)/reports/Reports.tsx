"use client";
import { useState } from "react";
import { Toon } from "@/types/toon";
import * as calc from "@/utils/calculations";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { useSorter } from "@/hooks/useSorter";

function getHighestEntry(data: Record<string, { month: string; growth: number }[]>) {
  let highest: { title: string; month: string; growth: number } | null = null;

  for (const title in data) {
    for (const entry of data[title]) {
      if (!highest || entry.growth > highest.growth) {
        highest = { title, ...entry };
      }
    }
  }

  return highest!;
}

function getProtagonist(webtoons: Toon[], title: string) {
  const protagonists = webtoons.find(item => item.title === title)?.protagonists;
  return protagonists?.split(", ")[0].split(" ")[0] + "'s";
}

export default function Reports({ webtoons, reports }: { 
  webtoons: Toon[], reports: { timestamp: string; snapshot: { title: string; value: number }[] }[]
}) {

  const [timestamp, setTimestamp] = useState<string>(reports[reports.length - 1].timestamp);

  const grouped = calc.groupByTitle(reports);
  const groupedByPercentGrowth = calc.buildGrowthMap(grouped, (prev, curr) => calc.calcMedianGrowth(prev!.value, curr.value), 1);
  const groupedBySubs = calc.buildGrowthMap(grouped, (_, curr) => curr.value, 0);
  const groupedBySubChange = calc.buildGrowthMap(grouped, (prev, curr) => calc.calcSubChange(prev!.value, curr.value), 1);

  const { sortedWebtoons, sortKey, setSortKey } = useSorter(
    reports.find(r => r.timestamp === timestamp)?.snapshot ?? [],
    s => s.title,
    s => s.value,
    s => groupedByPercentGrowth[s.title]?.find(item => item.month === timestamp)?.growth ?? -Infinity
  );

  const highestPercentGrowth = getHighestEntry(groupedByPercentGrowth);
  const highestSubs = getHighestEntry(groupedBySubs);
  const highestSubChange = getHighestEntry(groupedBySubChange);

  const cards = [
    {
      heading: "Highest Growth",
      value: calc.condenseValue(highestPercentGrowth.growth) + "%",
      subheading: `${getProtagonist(webtoons, highestPercentGrowth.title)} for ${highestPercentGrowth.month}`
    },
    {
      heading: "Highest Subs",
      value: calc.condenseValue(highestSubs.growth),
      subheading: `${getProtagonist(webtoons, highestSubs.title)} for ${highestSubs.month}`
    },
    {
      heading: "Highest Sub Change",
      value: calc.condenseValue(highestSubChange.growth),
      subheading: `${getProtagonist(webtoons, highestSubChange.title)} for ${highestSubChange.month}`
    }
  ];

  return (
    <article className="space-y-8">
      <h1>Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, index) => (
          <Card key={index} data={c} />
        ))}
      </div>
      <h2>Snapshots</h2>
      <Table
        headings={<>
          <th className="text-left">Timestamp</th>
          <th className="text-right">Count</th>
          <th className="text-right">Median Growth</th>
          <th className="text-right">Median Subs</th>
          <th className="text-right">Sub Change</th>
        </>}
        body={<tbody>
          {reports.map((r, index) => {
            const medianGrowthData = calc.getDataForMonth(groupedByPercentGrowth, r.timestamp);
            const medianGrowth = medianGrowthData.length > 0 ? calc.median(medianGrowthData).toFixed(1) + "%" : "";
            const medianSubData = calc.getDataForMonth(groupedBySubs, r.timestamp);
            const medianSubs = medianSubData.length > 0 ? calc.condenseValue(calc.median(medianSubData)) : "";
            const medianSubChangeData = calc.getDataForMonth(groupedBySubChange, r.timestamp);
            const medianSubChange = medianSubChangeData.length > 0 ? calc.condenseValue(calc.median(medianSubChangeData)) : "";
            return (
              <tr key={index} className="border-t border-slate-200">
                <td className="text-left font-medium">{r.timestamp}</td>
                <td className="text-right font-mono font-semibold">{r.snapshot.length}</td>
                <td className="text-right font-bold text-green-500">{medianGrowth}</td>
                <td className="text-right font-mono font-semibold">{medianSubs}</td>
                <td className="text-right font-mono font-semibold">{medianSubChange}</td>
              </tr>
            );
          })}
        </tbody>}
      />
      <div className="flex items-center justify-between">
        <h2>Breakdown</h2>
        <select value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="border bg-card border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary">
          {reports.map((r, index) => (
            <option key={index} value={r.timestamp}>{r.timestamp}</option>
          ))}
        </select>
      </div>
      <Table
        headings={<>
          <th className="w-15.5">#</th>
          <th className={`text-left cursor-pointer ${sortKey === "series" ? "text-primary" : "underline"}`} onClick={() => setSortKey("series")}>Series</th>
          <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary" : "underline"}`} onClick={() => setSortKey("subs")}>Subs</th>
          <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary" : "underline"}`} onClick={() => setSortKey("growth")}>Growth</th>
        </>}
        body={<tbody>
          {sortedWebtoons.map((s, index) => {
            const hasGrowth = groupedByPercentGrowth[s.title]?.find(item => item.month === timestamp)?.growth ?? -1;
            return (
              <tr key={index} className="border-t border-slate-200">
                <td className="text-center font-bold font-mono">{index + 1}</td>
                <td className="text-left font-medium">{s.title}</td>
                <td className="text-right font-mono font-semibold">{calc.condenseValue(s.value)}</td>
                <td className="text-right text-green-500 font-semibold">{hasGrowth !== -1 ? hasGrowth.toFixed(1) : ""}%</td>
              </tr>
          )})}
        </tbody>}
      />
    </article>
  );
}