"use client";
import Graph from "@/components/Graph";
import { HeartHandshake, Plus, X } from "lucide-react";
import { useState } from "react";

const toons = [
  {title: "Duchess in Ruins", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/833243/thumbnail/thumbnail_IMAG21_ea781ae5-07d1-478b-b9d0-86ebbfc4d9ea.jpg", status: "Ongoing", subs: 1000, lubs: 500, growth: 2, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "The Count's Secret Maid", genre: "Drama", cover: "https://image-comic.pstatic.net/webtoon/830106/thumbnail/thumbnail_IMAG21_c2616743-6c0a-47d9-af22-bc8dfe5c7b5b.jpg", status: "Hiatus", subs: 2000, lubs: 1500, growth: 1.75, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "The Price is Your Everything", genre: "Drama", cover: "https://image-comic.pstatic.net/webtoon/817998/thumbnail/thumbnail_IMAG21_070dfac2-b3d0-47ac-a3a6-e28e62342119.jpg", status: "Ongoing", subs: 3000, lubs: 2500, growth: 1.5, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "Noble in Name, Vulgar at Heart", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/839386/thumbnail/thumbnail_IMAG21_5525eed5-542b-433f-b6d5-02861139d9b9.jpg", status: "Ongoing", subs: 4000, lubs: 3500, growth: 1.25, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "Life of a Quack Healer", genre: "Fantasy", cover: "https://image-comic.pstatic.net/webtoon/808757/thumbnail/thumbnail_IMAG21_334dccd8-0a91-4063-84b0-77f0fcb85245.jpg", status: "Ongoing", subs: 5000, lubs: 4500, growth: 1, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "For My Derelict Favorite", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/794155/thumbnail/thumbnail_IMAG21_02e36070-2f60-49c1-849a-ceae6e2d1847.jpg", status: "Ongoing", subs: 6000, lubs: 5500, growth: 0.75, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "Your Ryan", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/841490/thumbnail/thumbnail_IMAG21_83cf1102-b8b4-44e0-8ccf-44a585821ddc.jpg", status: "Ongoing", subs: 7000, lubs: 6500, growth: 0.5, day: <><HeartHandshake className="h-4 w-auto" />Shared</>},
  {title: "The Age of Arrogance", genre: "Fantasy", cover: "https://image-comic.pstatic.net/webtoon/814538/thumbnail/thumbnail_IMAG21_37b888c5-d7d7-4722-95b2-2be5687efdda.jpg", status: "Completed", subs: 8000, lubs: 7500, growth: 0.25, day: <><HeartHandshake className="h-4 w-auto" />Shared</>}
]

function median(values: number[]) {
  const sorted = values.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export default function Home() {

  const [open, setOpen] = useState(false);

  const medianGrowth = median(toons.map(item => item.growth));
  const medianSubs = median(toons.map(item => item.subs));
  const medianSubChange = median(toons.map(item => item.subs - item.lubs));

  const graphs = [
    {title: "Median Growth Timeline", tagline: "How much a typical series is growing", data: [{month: "Jan 25", value: medianGrowth}, {month: "Feb 25", value: medianGrowth}]},
    {title: "Median Subs Timeline", tagline: "What a typical series following looks like", data: [{month: "Jan 25", value: medianSubs}, {month: "Feb 25", value: medianSubs}]},
    {title: "Median Sub Change Timeline", tagline: "How much a typical series gained/lost", data: [{month: "Jan 25", value: medianSubChange}, {month: "Feb 25", value: medianSubChange}]}
  ];

  const completed = toons.filter(item => item.status === "Completed").length;
  const hiatus = toons.filter(item => item.status === "Hiatus").length;
  const ongoing = toons.length - hiatus - completed;

  const cards = [
    {heading: "Median Growth", number: medianGrowth.toFixed(2) + "%", subheading: "0% from last month"},
    {heading: "Active Series", number: ongoing.toString(), subheading: `${hiatus} Hiatus, ${completed} Completed`},
    {heading: "Median Subs", number: (medianSubs / 1000) + "k", subheading: "0% from last month"},
    {heading: "Sub Change", number: medianSubChange > 0 ? "+" + medianSubChange : "-" + medianSubChange, subheading: "0% from last month"}
  ];

  const [sortKey, setSortKey] = useState<keyof typeof toons[number]>("subs");
  const [sortedToons, setSortedToons] = useState(() => [...toons].sort((a, b) => b.subs - a.subs));

  function sortBy(key: keyof typeof toons[number]) {
    setSortKey(key);
    const sorted = [...sortedToons].sort((a, b) => {
      const valA = Number(a[key]);
      const valB = Number(b[key]);
      return valB - valA;
    });
    setSortedToons(sorted);
  }

  return (
    <>
      <section className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center gap-4">
        <div>
          <h1>Dashboard</h1>
          <h4 className="mt-1">Your Webtoons analytics overview</h4>
        </div>
        <button className="bg-primary text-white px-6 py-2 flex items-center rounded-full text-sm font-bold gap-2 shadow-lg shadow-primary/20 cursor-pointer" onClick={() => setOpen(true)}><Plus className="h-4 w-auto" />Add Webtoon</button>
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
                <th className={`text-right cursor-pointer ${sortKey === "subs" ? "text-primary" : "underline"}`} onClick={() => sortBy("subs")}>Subs</th>
                <th className={`text-right cursor-pointer ${sortKey === "growth" ? "text-primary" : "underline"}`} onClick={() => sortBy("growth")}>Growth</th>
              </tr>
            </thead>
            <tbody className="text-emph">
              {sortedToons.map((t, index) => {
                let statusColor;
                switch (t.status) {
                  case "Ongoing":
                    statusColor = "text-green-500 bg-green-500/15";
                    break;
                  case "Hiatus":
                    statusColor = "text-orange-500 bg-orange-500/15";
                    break;
                  case "Completed":
                    statusColor = "text-blue-500 bg-blue-500/15"
                    break;
                }
                return (
                  <tr key={index} className="border-t border-slate-200">
                    <td className="text-center font-bold font-mono">{index + 1}</td>
                    <td className="text-left font-semibold"><div className="line-clamp-2">{t.title}</div></td>
                    <td className="text-left text-xs font-semibold"><span className="border px-2.5 py-0.5 rounded-xl inline-block">{t.genre}</span></td>
                    <td className="text-left"><span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor}`}>{t.status.toUpperCase()}</span></td>
                    <td className="text-left font-semibold flex items-center gap-1">{t.day}</td>
                    <td className="text-right font-mono font-bold">{new Intl.NumberFormat().format(t.subs)}</td>
                    <td className="text-right text-green-500 font-bold">{t.growth}%</td>
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
          <div className="mt-4">
            <Graph data={g.data} xValues="month" yValues="value" />
          </div>
        </section>
      )}
      <div className={`fixed absolute inset-0 bg-black/50 z-3 ${open ? "flex" : "hidden"} justify-center items-center`}>
        <div className="card m-8">
          <h2 className="text-center">Add Webtoon to Tracker</h2>
          <form className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 mt-6 items-center">
            <label>Webtoon Link:</label>
            <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" />
            <label>Thumbnail Link:</label>
            <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none outline-none focus:border-primary" />
            <div className="col-span-full grid grid-cols-2 gap-4 mt-6">
              <button className="text-sm bg-primary text-white shadow-lg shadow-primary/20 py-2 rounded-2xl font-semibold">Submit</button>
              <button className="text-sm border text-emph py-2 rounded-2xl font-semibold cursor-pointer" onClick={() => setOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
