"use client";
import { useState } from "react";
import Card from "@/components/Card";
import * as calc from "@/utils/calculations";
import { useSorter } from "@/hooks/useSorter";

export default function ReportClient({ reportData }: { reportData: { timestamp: string; snapshot: { title: string; value: number }[] }[];
}) {

  const sortedReports = reportData.sort((a, b) => { return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); });
  const [selectedReport, setSelectedReport] = useState(sortedReports[0]);

  const reportIndex = sortedReports.findIndex(item => item.timestamp === selectedReport.timestamp);
  const lastReport = reportIndex < sortedReports.length - 1;
  const intersection = lastReport ? sortedReports[reportIndex + 1].snapshot.filter(item => selectedReport.snapshot.some(s => s.title === item.title)) : [];
  const medianGrowth = calc.median(intersection.map(item => calc.calcMedianGrowth(item.value, selectedReport.snapshot.find(s => s.title === item.title)?.value ?? -1)));
  const medianSubs = calc.median(selectedReport.snapshot.map(item => item.value));
  const medianSubChange = calc.median(intersection.map(item => calc.calcSubChange(item.value, selectedReport.snapshot.find(s => s.title === item.title)?.value ?? -1)));

  const cards: { title: string; subtitle: string; value: string; icon: string; }[] = [
    { title: "Median Growth", subtitle: `subtitle`, value: `${lastReport ? calc.condenseValue(medianGrowth) : 0}%`, icon: "ri-line-chart-line" },
    { title: "Median Subs", subtitle: `subtitle`, value: calc.condenseValue(medianSubs), icon: "ri-user-heart-line" },
    { title: "Sub Change", subtitle: `subtitle`, value: lastReport ? calc.condenseValue(medianSubChange) : "0", icon: "ri-exchange-line" },
  ];

  const { sortedWebtoons, sortKey, setSortKey } = useSorter(
    selectedReport.snapshot,
    s => s.title,
    s => s.value,
    s => {
      const previousValue = intersection.find(item => item.title === s.title)?.value;
      return previousValue ? calc.calcMedianGrowth(previousValue, s.value) : -Infinity;
    }
  );

  return (
    <main>
      <section className="text-center sm:text-left">
        <h1 className="text-4xl">Reports</h1>
        <p className="mt-1 text-slate-500">Browse monthly snapshots of your tracked series and their rankings</p>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside>
          <h2 className="text-sm uppercase text-slate-500">Snapshots</h2>
          <div className="flex flex-row lg:flex-col gap-2 mt-2 overflow-x-auto">
            {sortedReports.map((r, index) => {
              const timeMatch = r.timestamp === selectedReport?.timestamp;
              return (
                <button key={index} className={`${timeMatch ? "bg-primary-five" : "bg-white border border-slate-200"} rounded-2xl p-4 text-left space-y-1 cursor-pointer shrink-0`} onClick={() => setSelectedReport(r)}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-bold text-sm ${timeMatch ? "text-white" : ""}`}>{r.timestamp}</span>
                    {index === 0 && <span className={`${timeMatch ? "bg-white/25 text-white" : "bg-primary-one text-primary-seven"} text-xs font-bold px-2 py-0.5 rounded-full`}>Latest</span>}
                  </div>
                  <p className={`text-slate-400 text-xs ${timeMatch ? "text-white/80" : ""}`}>{r.snapshot.length} series tracked</p>
                </button>
              );
            })}
          </div>
        </aside>
        <article className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="bg-primary-five/10 text-primary-five w-11 h-11 rounded-xl flex items-center justify-center">
                <i className="ri-calendar-check-line text-xl"></i>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-extrabold">{selectedReport.timestamp}</h2>
                <p className="text-sm text-slate-500">{selectedReport.snapshot.length} series ranked by this date</p>
              </div>
            </div>
            <div className="flex gap-2 text-lg text-slate-600">
              <button className="border border-slate-200 w-9 h-9 rounded-full hover:bg-slate-50 cursor-pointer disabled:opacity-50" onClick={() => setSelectedReport(sortedReports[reportIndex - 1])} disabled={reportIndex < 1}><i className="ri-arrow-left-s-line"></i></button>
              <button className="border border-slate-200 w-9 h-9 rounded-full hover:bg-slate-50 cursor-pointer disabled:opacity-50" onClick={() => setSelectedReport(sortedReports[reportIndex + 1])} disabled={reportIndex >= sortedReports.length - 1}><i className="ri-arrow-right-s-line"></i></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((c, index) => (
              <Card key={index} data={c} />
            ))}
          </div>
          <div className="w-full overflow-auto rounded-2xl mt-4 border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                <tr>
                  <th>#</th>
                  <th className={`text-left min-w-3xs cursor-pointer ${sortKey === "series" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("series")} >Series</th>
                  <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("subs")}>Subs</th>
                  <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("growth")}>Growth</th>
                </tr>
              </thead>
              <tbody>
                {sortedWebtoons.map((s, index) => {
                  const previousValue = intersection.find(item => item.title === s.title)?.value;
                  const latestGrowth = previousValue ? calc.calcMedianGrowth(previousValue, s.value) : -1;
                  const growthColor = latestGrowth > 0.05 ? "text-emerald-500" : latestGrowth < 0 ? "text-rose-600" : "text-slate-400";
                  return (
                    <tr key={index} className="border-t border-slate-100 hover:bg-slate-50/60">
                      <td className="text-center font-bold font-mono text-slate-500">{index + 1}</td>
                      <td className="font-semibold"><span className="line-clamp-1">{s.title}</span></td>
                      <td className="text-right font-mono font-bold">{calc.condenseValue(s.value)}</td>
                      <td className={`text-right font-bold ${growthColor}`}>{latestGrowth !== -1 ? calc.condenseValue(latestGrowth) + "%" : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  );
}