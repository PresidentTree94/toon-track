import { getWebtoons } from "@/lib/data/webtoonServerQueries";
import { OWNER_ICONS } from "@/utils/constants";
import Status from "@/components/Status";
import { condenseValue, calcMedianGrowth } from "@/utils/calculations";
import { notFound } from "next/navigation";

export default async function Detail({ params }: { params: { slug: string } }) {

  const { slug } = await params;
  const webtoonsData = await getWebtoons();
  const webtoon = webtoonsData.find(item => item.id === Number(slug));
  if (!webtoon) notFound();
  const { title, owner, thumbnail, genre, status, tags, authors, protagonists, days, data } = webtoon;

  const sortedWebtoons = webtoonsData.filter(item => item.initial).sort((a, b) => (b.data.at(-1)?.value ?? 0) - (a.data.at(-1)?.value ?? 0));
  const rank = sortedWebtoons.findIndex(s => s.id === Number(slug)) + 1;
  const latestSubs = data.length > 0 ? data.at(-1)!.value : -1;
  const latestGrowth = data.length > 1 ? calcMedianGrowth(data.at(-2)!.value, latestSubs) : -1;
  const cards = [
    { text: "Rank", value: "#" + rank, icon: "ri-trophy-line" },
    { text: "Subscribers", value: data.length > 0 ? condenseValue(latestSubs) : "—", icon: "ri-user-heart-line" },
    { text: "Growth", value: data.length > 1 ? condenseValue(latestGrowth) + "%" : "—", icon: "ri-line-chart-line" },
    { text: "Day(s)", value: days, icon: "ri-calendar-line" }
  ];

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 relative">
        <img src={thumbnail || `https://placehold.co/143x200?text=${title.replaceAll(" ", "+")}`} className="aspect-2/3 object-cover rounded-3xl w-full md:sticky top-24" />
        <div className="space-y-4">
          <div className="flex gap-2">
            <Status status={genre} />
            <Status status={status} />
          </div>
          <h1 className="text-4xl">{title}</h1>
          <p className="flex items-center gap-1.5"><i className={`${OWNER_ICONS[owner]} text-lg`}></i><span>Tracked by <span className="font-semibold">{owner}</span></span></p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c, index) => (
              <div key={index} className="bg-white border border-slate-200 hover:border-primary-five/40 rounded-2xl p-4 space-y-1 transition-colors">
                <div className="flex items-center gap-1.5">
                  <i className={`${c.icon} text-primary-five`}></i>
                  <span className="text-xs font-medium text-slate-500">{c.text}</span>
                </div>
                <h3 className="text-xl font-extrabold">{c.value}</h3>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <h2 className="text-sm uppercase text-slate-500">Tags & Tropes</h2>
            <div className="flex gap-2 text-xs font-semibold mt-2">
              {tags.sort().map((t, index) => (
                <span key={index} className="bg-slate-100 text-slate-600 rounded-full px-3 py-1.5">{t}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-2">
              <div className="bg-primary-five/10 text-primary-five w-9 h-9 rounded-xl flex items-center justify-center">
                <i className="ri-quill-pen-line"></i>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Authors</p>
                <p className="font-bold">{authors}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-2">
              <div className="bg-amber-500/10 text-amber-600 w-9 h-9 rounded-xl flex items-center justify-center">
                <i className="ri-user-star-line"></i>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Protagonists</p>
                <p className="font-bold">{protagonists}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>Graphs</section>
    </main>
  );
}