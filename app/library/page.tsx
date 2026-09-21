import { getWebtoons } from "@/lib/data/webtoonServerQueries";
import { Toon } from "@/types/toon";
import { OWNER_ICONS } from "@/utils/constants";
import { calcMedianGrowth, condenseValue } from "@/utils/calculations";

export default async function Library() {
  const webtoonsData = await getWebtoons();
  const verifiedWebtoons: Toon[] = webtoonsData.filter(item => item.initial);
  return (
    <main className="max-w-[1400px] mx-auto pt-24 px-8 pb-16 space-y-8">
      <section>
        <h1 className="text-4xl">Library</h1>
        <p className="mt-1 text-slate-500">Manage and browse your <span className="font-bold text-primary-five">{verifiedWebtoons.length}</span> active series</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {verifiedWebtoons.map(w => {
          const latestSubs = w.data.length > 0 ? w.data[w.data.length - 1].value : -1;
          const latestGrowth = w.data.length > 1 ? calcMedianGrowth(w.data[w.data.length - 2].value, latestSubs) : -1;
          const growthColor = latestGrowth > 0.05 ? "text-emerald-500" : latestGrowth < 0 ? "text-rose-600" : "text-slate-400";
          return (
            <div key={w.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="relative aspect-2/3">
                <img src={w.thumbnail || `https://placehold.co/143x200?text=${w.title.replaceAll(" ", "+")}`} alt={w.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
                  <span className={`self-end text-xs font-bold px-2 py-1 rounded-full uppercase ${w.status === "Ongoing" ? "text-emerald-700 bg-emerald-400" : "text-amber-700 bg-amber-400"}`}>{w.status}</span>
                  <h3 className="text-white font-bold text-2xl line-clamp-4">{w.title}</h3>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex gap-1.5 text-xs font-semibold">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{w.genre}</span>
                  {w.days.split(", ").map((d, index) => (
                    <span key={index} className="bg-primary-one text-primary-seven px-2 py-1 rounded-full flex items-center gap-1"><i className="ri-calendar-line"></i>{d}</span>
                  ))}
                </div>
                <span className="text-sm text-slate-600 flex items-center gap-1.5"><i className={OWNER_ICONS[w.owner]}></i>{w.owner}</span>
                <div className="flex justify-between items-center font-bold">
                  <span className="font-mono">{latestSubs !== -1 ? condenseValue(latestSubs) : "—"}</span>
                  <span className={`text-sm ${growthColor}`}>{latestGrowth !== -1 ? condenseValue(latestGrowth) + "%" : "—"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}