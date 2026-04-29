"use client";
import Graph from "@/components/Graph";
import { useState } from "react";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import { median, condenseValue, calcMedianGrowth, calcMedianGrowthTimeline } from "@/utils/calculations";
import { ICONS, STATUS_COLORS, STATUS_BADGE_COLORS } from "@/utils/constants";
import Link from "next/link";

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

export default function Home({ webtoonsData, completedData }: { webtoonsData: Toon[], completedData: Comp[] }) {

  const verifiedWebtoons = webtoonsData.filter(item => item.initial);

  const growthThreshold = verifiedWebtoons.filter(item => item.data.length > 1);
  const subThreshold = verifiedWebtoons.filter(item => item.data.length > 0);

  const medianGrowth = median(growthThreshold.map(item =>
    calcMedianGrowth(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));
  const medianSubs = median(subThreshold.map(item => item.data[item.data.length - 1].value));
  const medianSubChange = median(growthThreshold.map(item =>
    calcSubChange(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));

  const hiatus = verifiedWebtoons.filter(item => item.status === "Hiatus").length;
  const ongoing = verifiedWebtoons.length - hiatus;

  const cards = [
    {heading: "Median Growth", number: growthThreshold.length > 0 ? medianGrowth.toFixed(0) + "%" : "N/E", subheading: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`},
    {heading: "Active Series", number: ongoing.toString(), subheading: `${hiatus} Hiatus, ${completedData.length} Completed`},
    {heading: "Median Subs", number: subThreshold.length > 0 ? condenseValue(medianSubs) : "N/E", subheading: `from ${subThreshold.length}/${verifiedWebtoons.length} Webtoons`},
    {heading: "Sub Change", number: growthThreshold.length > 0 ? condenseValue(medianSubChange) : "N/E", subheading: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`}
  ];

  const graphs = [
    {title: "Median Growth Timeline", tagline: "How much a typical series is growing", data: calcMedianGrowthTimeline(verifiedWebtoons)},
    {title: "Median Subs Timeline", tagline: "What a typical series following looks like", data: calcMedianSubsTimeline(verifiedWebtoons)},
    {title: "Median Sub Change Timeline", tagline: "How much a typical series gained/lost", data: calcSubChangeTimeline(verifiedWebtoons)}
  ];

  const [sortKey, setSortKey] = useState<"series" |"subs" | "growth">("subs");
  const sortedWebtoons = [...verifiedWebtoons].sort((a, b) => {
    const aSubs = a.data[a.data.length - 1] ? a.data[a.data.length - 1].value : 0;
    const bSubs = b.data[b.data.length - 1] ? b.data[b.data.length - 1].value : 0;
    const aGrowth = a.data[a.data.length - 2] ? calcMedianGrowth(a.data[a.data.length - 2].value, aSubs) : -Infinity;
    const bGrowth = b.data[b.data.length - 2] ? calcMedianGrowth(b.data[b.data.length - 2].value, bSubs) : -Infinity;
    if (sortKey === "series") return a.title.localeCompare(b.title);
    if (sortKey === "subs") return bSubs - aSubs;
    if (sortKey === "growth") return bGrowth - aGrowth;
    return 0;
  });

  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const DAY_LIMIT = 5;
  const KarlyWebtoons = verifiedWebtoons.filter(w => w.owner === "Karly" && Math.floor((Date.now() - new Date(w.timestamp).getTime()) / MS_PER_DAY) <= DAY_LIMIT);
  const RachelleWebtoons = verifiedWebtoons.filter(w => w.owner === "Rachelle" && Math.floor((Date.now() - new Date(w.timestamp).getTime()) / MS_PER_DAY) <= DAY_LIMIT);
  const changeOwnership = verifiedWebtoons.filter(w => Math.floor((Date.now() - new Date(w.owner_time).getTime()) / MS_PER_DAY) <= DAY_LIMIT);
  const changeStatus = verifiedWebtoons.filter(w => w.status_time && Math.floor((Date.now() - new Date(w.status_time).getTime()) / MS_PER_DAY) <= DAY_LIMIT);
  const completedRecently = completedData.filter(c => Math.floor((Date.now() - new Date(c.timestamp).getTime()) / MS_PER_DAY) <= DAY_LIMIT);
  const missingData = [...verifiedWebtoons.filter(w => !w.genre || !w.thumbnail), ...completedData.filter(c => !c.genre || !c.thumbnail)];
  const pendingData = webtoonsData.length - verifiedWebtoons.length;
  const anyNotices = KarlyWebtoons.length + RachelleWebtoons.length + changeOwnership.length + changeStatus.length + completedRecently.length + missingData.length + pendingData > 0;

  const notices = [
    {notice: KarlyWebtoons, prefix: "Karly added ", suffix: "."},
    {notice: RachelleWebtoons, prefix: "Rachelle added ", suffix: "."},
    {notice: changeOwnership, prefix: "", suffix: " changed ownership."},
    {notice: changeStatus, prefix: "", suffix: " changed status."},
    {notice: completedRecently, prefix: "", suffix: `${completedRecently.length === 1 ? " was" : " were"} archived.`},
    {notice: missingData, prefix: "", suffix: `${missingData.length === 1 ? " is" : " are"} missing data.`},
  ];

  return (
    <>
      <section className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center gap-4">
        <div>
          <h1>Dashboard</h1>
          <h4 className="mt-1">Your Webtoons analytics overview</h4>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 cursor-pointer">Generate Report</button>
      </section>
      {anyNotices && <section className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
        <h2>Notices</h2>
        <ul className="space-y-1 mt-4">
          {notices.map((n, index) => (
            n.notice.length > 0 && <li key={index}>
              {n.notice.length === 1 ? <>
                {n.prefix}
                {n.notice.length === 1 ? completedData.some(c => c.title === n.notice[0].title) ? <Link href="/archive" className="underline">1 Webtoon</Link> : <Link href={`/library/${n.notice[0].id}`} className="underline">1 Webtoon</Link> : `${n.notice.length} Webtoons`}
                {n.suffix}
              </> :
              <details className="space-y-1">
                <summary className="cursor-pointer">{n.prefix}{n.notice.length} Webtoons{n.suffix}</summary>
                {n.notice.map((w, index) => (
                  <p key={index} className="ml-4">{completedData.some(c => c.title === w.title) ? <Link href="/archive" className="underline">{w.title}</Link> : <Link href={`/library/${w.id}`} className="underline">{w.title}</Link>}</p>
                ))}
              </details>}
            </li>
          ))}
          {pendingData > 0 && <li>{pendingData} Webtoon{pendingData === 1 ? " is" : "s are"} pending validation.</li>}
        </ul>
      </section>}
      <section>
        <h2 className={`mb-4 ${anyNotices ? "block" : "hidden"}`}>Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, index) =>
            <div key={index} className="card">
              <p className="font-medium">{c.heading}</p>
              <h2 className="mt-1 mb-2">{c.number}</h2>
              <p className="text-sm">{c.subheading}</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2>Series Ranking</h2>
        <p>As of {firstOfMonth}</p>
        <div className="relative w-full overflow-auto rounded-xl mt-4 shadow border border-slate-200">
          <table className="text-sm w-full bg-card/50">
            <thead className="bg-slate-100 uppercase">
              <tr>
                <th className="w-15.5">#</th>
                <th className={`text-left cursor-pointer ${sortKey === "series" ? "text-primary" : "underline"}`} onClick={() => setSortKey("series")}>Series</th>
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
                    <td className="text-left"><span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[w.status]} ${STATUS_BADGE_COLORS[w.status]}`}>{w.status && w.status.toUpperCase()}</span></td>
                    <td className="text-left font-semibold"><div className="flex items-center gap-1"><Icon className="h-4 w-auto" />{w.owner}</div></td>
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
            {g.data.length > 1 ? <Graph data={g.data} /> : <div className="border border-dashed h-full rounded-2xl flex items-center justify-center"><p>Not enough data to generate graph.</p></div>}
          </div>
        </section>
      )}
    </>
  );
}
