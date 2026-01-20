import { Search, Plus, Users, ArrowUp, TrendingUp, ArrowUpRight } from "lucide-react";

export default function Home() {

  const links = [
    {label: "Dashboard"},
    {label: "Explore"},
    {label: "Library"},
    {label: "Trends"}
  ];

  return (
    <>
      <header className="bg-card flex items-center gap-8 px-8 h-16">
        <div className="flex items-center gap-3">
          <span>icon</span>
          <h3>ToonTrack</h3>
        </div>
        <nav className="text-sm font-medium flex gap-1">
          {links.map((l, index) =>
            <a key={index} className="py-2 px-4 rounded-full hover:bg-primary hover:text-card">{l.label}</a>
          )}
        </nav>
        <div className="flex-1">
          <div className="flex items-center gap-2 border rounded-full max-w-md mx-auto py-1 px-2">
            <Search className="h-4 w-auto" />
            <input type="text" placeholder="Search your webtoons..." className="text-sm" />
          </div>
        </div>
        <div>buttons</div>
      </header>
      <main className="max-w-7xl p-8 m-auto space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1>Overview</h1>
            <p className="text-lg mt-1">Your creator stats for this week.</p>
          </div>
          <div className="flex">
            <button>Time period</button>
            <button className="bg-primary text-white flex items-center gap-4 px-6 py-2 text-sm font-bold rounded-full shadow-lg shadow-primary/20"><Plus className="h-4 w-auto" />Add Webtoon</button>
          </div>
        </section>
        <section className="grid grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-2xl text-white relative shadow-lg shadow-primary/20">
            <p className="text-white/80 font-medium">Combined Reach</p>
            <h2 className="text-white mt-1 mb-4">873.7k</h2>
            <p className="flex items-center gap-1 text-sm bg-white/20 rounded-full max-w-fit px-3 py-1 font-medium"><ArrowUp className="h-4 w-auto" />4.2% growth across library</p>
            <Users className="h-30 w-auto text-white/10 absolute top-4 right-4" />
          </div>
          <div className="bg-card p-6 shadow-sm rounded-2xl flex flex-col justify-center">
            <p className="font-medium">Active Series</p>
            <h2 className="mt-1 mb-2">3</h2>
            <p className="text-sm">2 Ongoing, 1 Hiatus, 1 Completed</p>
          </div>
          <div className="bg-green-50/50 p-6 shadow-sm rounded-2xl flex items-center justify-between">
            <div className="flex gap-4">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-auto text-primary" />
              </div>
              <div>
                <p className="text-sm">Top Performer</p>
                <h3>Arcane Ascension</h3>
              </div>
            </div>
            <div>
              <p className="font-bold text-green-600">+12.5%</p>
              <p className="text-xs">this week</p>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h3>Your Library</h3>
          </div>
          <div>
            <h3>Series Ranking</h3>
            <div className="bg-card shadow-sm rounded-2xl mt-6">
              <p className="p-6 font-semibold font-headings text-emph text-lg">By Subscriber Count</p>
              <table className="text-sm">
                <tr className="font-bold uppercase text-xs px-6 py-3 tracking-wider bg-slate-100">
                  <th className="pl-6 w-full text-left">Series</th>
                  <th className="text-right">Subs</th>
                  <th className="pr-6 text-right">Weekly</th>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="pl-6 font-bold">Arcane Ascension</td>
                  <td className="font-medium">124.5k</td>
                  <td className="pr-6 text-green-600 font-bold flex items-center gap-1"><ArrowUpRight className="h-4 w-auto" />12.5%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="pl-6 font-bold">Arcane Ascension</td>
                  <td className="font-medium">124.5k</td>
                  <td className="pr-6 text-green-600 font-bold flex items-center gap-1"><ArrowUpRight className="h-4 w-auto" />12.5%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="pl-6 font-bold">Arcane Ascension</td>
                  <td className="font-medium">124.5k</td>
                  <td className="pr-6 text-green-600 font-bold flex items-center gap-1"><ArrowUpRight className="h-4 w-auto" />12.5%</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
