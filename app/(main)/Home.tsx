"use client";
import { useState } from "react";
import Link from "next/link";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import * as calc from "@/utils/calculations";
import { ICONS, STATUS_COLORS, STATUS_BADGE_COLORS } from "@/utils/constants";
import Notices from "@/components/Notices";
import Cards from "@/components/Cards";
import Table from "@/components/Table";
import Graph from "@/components/Graph";
import { useSorter } from "@/hooks/useSorter";

export default function Home({ webtoonsData, completedData }: { webtoonsData: Toon[], completedData: Comp[] }) {

  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  
  const [anyNotices, setAnyNotices] = useState(false);

  const firstOfMonth = new Date(new Date().setDate(1)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  const { sortedWebtoons, sortKey, setSortKey } = useSorter(
    verifiedWebtoons,
    (w: { title: string }) => w.title,
    (w: { data: { month: string; value: number; }[] }) => w.data.at(-1)?.value ?? 0,
    (w: { data: { month: string; value: number; }[] }) => {
      const prev = w.data.at(-2);
      const subs = w.data.at(-1)?.value ?? 0;
      return prev ? calc.calcMedianGrowth(prev.value, subs) : -Infinity;
    }
  );

  const graphs = [
    {title: "Median Growth Timeline", tagline: "How much a typical series is growing", data: calc.calcMedianGrowthTimeline(verifiedWebtoons)},
    {title: "Median Subs Timeline", tagline: "What a typical series following looks like", data: calc.calcMedianSubsTimeline(verifiedWebtoons)},
    {title: "Median Sub Change Timeline", tagline: "How much a typical series gained/lost", data: calc.calcSubChangeTimeline(verifiedWebtoons)}
  ];

  return (
    <>
      <section className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center gap-4">
        <div>
          <h1>Dashboard</h1>
          <h4 className="mt-1">Your Webtoons analytics overview</h4>
        </div>
        <Link href="/reports" className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20">View Past Data</Link>
      </section>
      <Notices
        webtoonsData={webtoonsData}
        verifiedWebtoons={verifiedWebtoons}
        completedData={completedData}
        onAnyNotices={setAnyNotices}
      />
      <Cards verifiedWebtoons={verifiedWebtoons} completedData={completedData} anyNotices={anyNotices} />
      <section>
        <h2>Series Ranking</h2>
        <p>As of {firstOfMonth}</p>
        <Table
          headings={<>
            <th className="w-15.5">#</th>
            <th className={`text-left cursor-pointer ${sortKey === "series" ? "text-primary" : "underline"}`} onClick={() => setSortKey("series")}>Series</th>
            <th className="text-left">Status</th>
            <th className="text-left">Owner</th>
            <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary" : "underline"}`} onClick={() => setSortKey("subs")}>Subs</th>
            <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary" : "underline"}`} onClick={() => setSortKey("growth")}>Growth</th>
          </>}
          body={<tbody className="text-emph">
            {sortedWebtoons.map((w, index) => {
              const Icon = ICONS[w.owner];
              const latestSubs = w.data.length > 0 ? w.data[w.data.length - 1].value : -1;
              const latestGrowth = w.data.length > 1 ? calc.calcMedianGrowth(w.data[w.data.length - 2].value, latestSubs) : -1;
              return (
                <tr key={w.id} className="border-t border-slate-200">
                  <td className="text-center font-bold font-mono">{index + 1}</td>
                  <td className="text-left font-semibold">
                    <Link href={`/library/${w.id}`}><span className="line-clamp-2">{w.title}</span></Link>
                  </td>
                  <td className="text-left"><span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[w.status]} ${STATUS_BADGE_COLORS[w.status]}`}>{w.status && w.status.toUpperCase()}</span></td>
                  <td className="text-left font-semibold"><div className="flex items-center gap-1"><Icon className="h-4 w-auto" />{w.owner}</div></td>
                  <td className="text-right font-mono font-bold">{latestSubs !== -1 ? calc.condenseValue(latestSubs) : ""}</td>
                  <td className="text-right text-green-500 font-bold">{latestGrowth !== -1 ? calc.condenseValue(latestGrowth) : ""}%</td>
                </tr>
              );
            })}
          </tbody>}
        />
      </section>
      {graphs.map((g, index) =>
        <section key={index}>
          <h2>{g.title}</h2>
          <i>{g.tagline}</i>
          <div className="mt-4 h-75">
            {g.data.length > 1 ? <Graph data={g.data} /> : <div className="border border-dashed h-full rounded-2xl flex items-center justify-center"><p>Not enough data to generate graph.</p></div>}
          </div>
        </section>
      )}
    </>
  );
}
