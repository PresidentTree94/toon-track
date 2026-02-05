"use client";
import Graph from "@/components/Graph";
import { useState, useEffect } from "react";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import { supabase } from "@/lib/supabaseClient";
import { median, condenseValue, calcMedianGrowth, calcMedianGrowthTimeline } from "@/utils/calculations";
import { ICONS, STATUS_COLORS, STATUS_BADGE_COLORS } from "@/utils/constants";

function calcSubChange(pastSubscribers: number, latestSubscribers: number) {
  return latestSubscribers - pastSubscribers;
}

function calcMedianSubsTimeline(database: Toon[]) {
  const monthlyMediaSubs: Record<string, number[]> = {};
  for (const toon of database) {
    for (let i = 0; i < toon.data.length; i++) {
      (monthlyMediaSubs[toon.data[i].month] ??= []).push(toon.data[i].value);
    }
  }
  return Object.entries(monthlyMediaSubs).map(([month, values]) => ({month, value: median(values)}));
}

function calcSubChangeTimeline(database: Toon[]) {
  const monthlySubChanges: Record<string, number[]> = {};
  for (const toon of database) {
    for (let i = 1; i < toon.data.length; i++) {
      const past = toon.data[i - 1], latest = toon.data[i];
      (monthlySubChanges[toon.data[i].month] ??= []).push(latest.value - past.value);
    }
  }
  return Object.entries(monthlySubChanges).map(([month, values]) => ({month, value: median(values)}));
}

export default function Home() {

  const [webtoons, setWebtoons] = useState<Toon[]>([]);
  const [completed, setCompleted] = useState<Comp[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: webtoons } = await supabase.from("webtoons").select("*");
      setWebtoons(webtoons ?? []);
      const { data: completed } = await supabase.from("completed").select("*");
      setCompleted(completed ?? []);
    };
    fetchData();
  }, []);

  const growthThreshold = webtoons.filter(item => item.data.length > 1);
  const subThreshold = webtoons.filter(item => item.data.length > 0);

  const medianGrowth = median(growthThreshold.map(item =>
    calcMedianGrowth(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));
  const medianSubs = median(subThreshold.map(item => item.data[item.data.length - 1].value));
  const medianSubChange = median(growthThreshold.map(item =>
    calcSubChange(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));

  const hiatus = webtoons.filter(item => item.status === "Hiatus").length;
  const ongoing = webtoons.length - hiatus;

  const cards = [
    {heading: "Median Growth", number: growthThreshold.length > 0 ? medianGrowth.toFixed(0) + "%" : "N/E", subheading: `from ${growthThreshold.length}/${webtoons.length} Webtoons`},
    {heading: "Active Series", number: ongoing.toString(), subheading: `${hiatus} Hiatus, ${completed.length} Completed`},
    {heading: "Median Subs", number: subThreshold.length > 0 ? condenseValue(medianSubs) : "N/E", subheading: `from ${subThreshold.length}/${webtoons.length} Webtoons`},
    {heading: "Sub Change", number: growthThreshold.length > 0 ? condenseValue(medianSubChange) : "N/E", subheading: `from ${growthThreshold.length}/${webtoons.length} Webtoons`}
  ];

  const graphs = [
    {title: "Median Growth Timeline", tagline: "How much a typical series is growing", data: calcMedianGrowthTimeline(webtoons)},
    {title: "Median Subs Timeline", tagline: "What a typical series following looks like", data: calcMedianSubsTimeline(webtoons)},
    {title: "Median Sub Change Timeline", tagline: "How much a typical series gained/lost", data: calcSubChangeTimeline(webtoons)}
  ];

  const [sortKey, setSortKey] = useState<"subs" | "growth">("subs");
  const sortedWebtoons = [...webtoons].sort((a, b) => {
    const aSubs = a.data[a.data.length - 1] ? a.data[a.data.length - 1].value : 0;
    const bSubs = b.data[b.data.length - 1] ? b.data[b.data.length - 1].value : 0;
    const aGrowth = a.data[a.data.length - 2] ? calcMedianGrowth(a.data[a.data.length - 2].value, aSubs) : -Infinity;
    const bGrowth = b.data[b.data.length - 2] ? calcMedianGrowth(b.data[b.data.length - 2].value, bSubs) : -Infinity;
    if (sortKey === "subs") return bSubs - aSubs;
    if (sortKey === "growth") return bGrowth - aGrowth;
    return 0;
  });

  return (
    <>
      <section className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center gap-4">
        <div>
          <h1>Dashboard</h1>
          <h4 className="mt-1">Your Webtoons analytics overview</h4>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 cursor-pointer">Generate Report</button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, index) =>
          <div key={index} className="card">
            <p className="font-medium">{c.heading}</p>
            <h2 className="mt-1 mb-2">{c.number}</h2>
            <p className="text-sm">{c.subheading}</p>
          </div>
        )}
      </section>
      <section>
        <h2>Series Ranking</h2>
        <p>As of January 1, 2025</p>
        <div className="relative w-full overflow-auto rounded-xl mt-4 shadow border border-slate-200">
          <table className="text-sm w-full bg-card/50">
            <thead className="bg-slate-100 uppercase">
              <tr>
                <th className="w-15.5">#</th>
                <th className="text-left">Series</th>
                <th className="text-left">Genre</th>
                <th className="text-left">Status</th>
                <th className="text-left">Owner</th>
                <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary" : "underline"}`} onClick={() => setSortKey("subs")}>Subs</th>
                <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary" : "underline"}`} onClick={() => setSortKey("growth")}>Growth</th>
              </tr>
            </thead>
            <tbody className="text-emph">
              {sortedWebtoons.map((w, index) => {
                const Icon = ICONS[w.owner];
                const latestSubs = w.data.length > 0 ? w.data[w.data.length - 1].value : -1;
                const latestGrowth = w.data.length > 1 ? calcMedianGrowth(w.data[w.data.length - 2].value, latestSubs) : -1;
                return (
                  <tr key={w.id} className="border-t border-slate-200">
                    <td className="text-center font-bold font-mono">{index + 1}</td>
                    <td className="text-left font-semibold"><div className="line-clamp-2">{w.title}</div></td>
                    <td className="text-left text-xs font-semibold"><span className="border px-2.5 py-0.5 rounded-xl inline-block">{w.genre}</span></td>
                    <td className="text-left"><span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[w.status]} ${STATUS_BADGE_COLORS[w.status]}`}>{w.status && w.status.toUpperCase()}</span></td>
                    <td className="text-left font-semibold flex items-center gap-1"><Icon className="h-4 w-auto" />{w.owner}</td>
                    <td className="text-right font-mono font-bold">{latestSubs !== -1 ? condenseValue(latestSubs) : ""}</td>
                    <td className="text-right text-green-500 font-bold">{latestGrowth !== -1 ? latestGrowth.toFixed(0) : ""}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {graphs.map((g, index) =>
        <section key={index}>
          <h2>{g.title}</h2>
          <i>{g.tagline}</i>
          <div className="mt-4 h-75">
            {g.data.length > 0 ? <Graph data={g.data} /> : <div className="border border-dashed h-full rounded-2xl flex items-center justify-center"><p>Not enough data to generate graph.</p></div>}
          </div>
        </section>
      )}
    </>
  );
}
