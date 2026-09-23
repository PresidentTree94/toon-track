"use client";
import Link from "next/link";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import * as calc from "@/utils/calculations";
import Notices from "@/components/Notices";
import { useSorter } from "@/hooks/useSorter";
import { OWNER_ICONS } from "@/utils/constants";
import Status from "@/components/Status";
import Card from "@/components/Card";

export default function HomeClient({ webtoonsData, completedData }: { webtoonsData: Toon[]; completedData: Comp[]; }) {

  const verifiedWebtoons = webtoonsData.filter(item => item.initial);
  const pendingWebtoons = webtoonsData.filter(item => !item.initial);
  const firstOfMonth = new Date(new Date().setDate(1)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  const growthThreshold = verifiedWebtoons.filter(item => item.data.length > 1);
  const subThreshold = verifiedWebtoons.filter(item => item.data.length > 0);
  const medianGrowth = calc.median(growthThreshold.map(item =>
    calc.calcMedianGrowth(item.data.at(-2)!.value, item.data.at(-1)!.value)));
  const medianSubs = calc.median(subThreshold.map(item => item.data.at(-1)!.value));
  const medianSubChange = calc.median(growthThreshold.map(item =>
    calc.calcSubChange(item.data.at(-2)!.value, item.data.at(-1)!.value)));
  const hiatus = verifiedWebtoons.filter(item => item.status === "Hiatus").length;
  const ongoing = verifiedWebtoons.length - hiatus;

  const cards: { title: string; subtitle: string; value: string; icon: string; }[] = [
    { title: "Median Growth", subtitle: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`, value: `${calc.condenseValue(medianGrowth)}%`, icon: "ri-line-chart-line" },
    { title: "Active Series", subtitle: `${hiatus} Hiatus, ${completedData.length} Completed`, value: ongoing.toString(), icon: "ri-bookmark-line" },
    { title: "Median Subs", subtitle: `from ${subThreshold.length}/${verifiedWebtoons.length} Webtoons`, value: calc.condenseValue(medianSubs), icon: "ri-user-heart-line" },
    { title: "Sub Change", subtitle: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`, value: calc.condenseValue(medianSubChange), icon: "ri-exchange-line" },
  ];

  const { sortedWebtoons, sortKey, setSortKey } = useSorter(
    verifiedWebtoons,
    w => w.title,
    w => w.data.at(-1)?.value ?? 0,
    w => {
      const prev = w.data.at(-2);
      const subs = w.data.at(-1)?.value ?? 0;
      return prev ? calc.calcMedianGrowth(prev.value, subs) : -Infinity;
    }
  );

  return (
    <main>
      <section className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        <div>
          <h1 className="text-4xl">Dashboard</h1>
          <p className="mt-1 text-slate-500">Your Webtoons analytics overview</p>
        </div>
        <Link href="/reports" className="bg-primary-five hover:bg-primary-six text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"><i className="ri-history-line"></i>View Past Data</Link>
      </section>
      <Notices verifiedWebtoons={verifiedWebtoons} completedData={completedData} pendingData={pendingWebtoons} />
      <section>
        <h2 className="text-xl">Live Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {cards.map((c, index) => (
            <Card key={index} data={c} />
          ))}
        </div>
      </section>
      <section>
        <div className="flex justify-between items-end gap-2">
          <div>
            <h2 className="text-xl">Series Ranking</h2>
            <p className="text-sm text-slate-500">As of {firstOfMonth}</p>
          </div>
          <p className="text-xs text-slate-500">{verifiedWebtoons.length} series tracked</p>
        </div>
        <div className="w-full overflow-auto rounded-2xl mt-4 border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
              <tr>
                <th>#</th>
                <th className={`text-left min-w-3xs cursor-pointer ${sortKey === "series" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("series")}>Series</th>
                <th className="text-left">Status</th>
                <th className="text-left">Owner</th>
                <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("subs")}>Subs</th>
                <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary-five" : "underline"}`} onClick={() => setSortKey("growth")}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {sortedWebtoons.map((w, index) => {
                const latestSubs = w.data.length > 0 ? w.data.at(-1)!.value : -1;
                const latestGrowth = w.data.length > 1 ? calc.calcMedianGrowth(w.data.at(-2)!.value, latestSubs) : -1;
                const growthColor = latestGrowth > 0.05 ? "text-emerald-500" : latestGrowth < 0 ? "text-rose-600" : "text-slate-400";
                return (
                  <tr key={w.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                    <td className="text-center font-bold font-mono text-slate-500">{index + 1}</td>
                    <td className="font-semibold"><Link href={`/library/${w.id}`}><span className="line-clamp-1">{w.title}</span></Link></td>
                    <td><Status status={w.status} /></td>
                    <td className="font-semibold">
                      <div className="flex items-center gap-1.5">
                        <i className={OWNER_ICONS[w.owner]}></i>
                        {w.owner}
                      </div>
                    </td>
                    <td className="text-right font-mono font-bold">{latestSubs !== -1 ? calc.condenseValue(latestSubs) : "—"}</td>
                    <td className={`text-right font-bold ${growthColor}`}>{latestGrowth !== -1 ? calc.condenseValue(latestGrowth) + "%" : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section>Graph</section>
      <section>Graph</section>
      <section>Graph</section>
    </main>
  );
}