"use client";
import Webtoon from "@/components/Webtoon";
import { LayoutDashboard, Compass, BookOpen, Search, Plus, ChartNoAxesCombined, TrendingUp, ArrowUpRight } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Home() {

  const links = [
    {label: "Dashboard", icon: LayoutDashboard},
    {label: "Explore", icon: Compass},
    {label: "Library", icon: BookOpen},
    {label: "Trends", icon: TrendingUp}
  ];

  const data = [ { week: 'Week 2', value: 100 }, { week: 'Week 3', value: 60 }, { week: 'Week 4', value: 55 }, { week: 'Week 5', value: 50 }, { week: 'Week 6', value: 45 }, { week: 'Week 7', value: 40 }, { week: 'Week 8', value: 35 }, { week: 'Week 9', value: 30 }, { week: 'Week 10', value: 25 }, { week: 'Week 11', value: 20 }, { week: 'Week 12', value: 15 }, ];

  return (
    <>
      <header className="bg-card/80 backdrop-blur-xl grid grid-cols-[1fr_4fr_1fr] md:grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_auto_1fr_auto] items-center md:gap-8 md:px-8 h-16 fixed w-full bottom-0 md:top-0 md:bottom-auto z-1 border-t md:border-b md:border-t-none border-slate-200">
        <div className="justify-self-center md:justify-self-none flex items-center gap-3">
          <span>icon</span>
          <h3 className="hidden md:block">ToonTrack</h3>
        </div>
        <nav className="grid grid-cols-4 md:grid-cols-[repeat(4,auto)] justify-items-center text-sm font-medium md:gap-1">
          {links.map((l, index) =>
            <a key={index} className="py-2 px-4 rounded-full hover:bg-primary hover:text-card"><l.icon className="md:hidden" /><span className="hidden md:inline">{l.label}</span></a>
          )}
        </nav>
        <div className="hidden lg:block flex-1">
          <div className="flex items-center gap-2 bg-slate-50 shadow-sm rounded-full max-w-md mx-auto py-1.5 px-2.5 border border-transparent focus-within:border-primary">
            <Search className="h-4 w-auto" />
            <input type="text" placeholder="Search webtoons..." className="text-sm flex-1 placeholder:text-base outline-none" />
          </div>
        </div>
        <div className="justify-self-center md:justify-self-end">profile</div>
      </header>
      <main className="max-w-7xl px-4 py-8 sm:px-8 mx-auto mb-16 md:mt-16 md:mb-0 space-y-8">
        <section className="flex flex-col md:flex-row md:items-center gap-4 @container">
          <div>
            <h1>Overview</h1>
            <h4 className="mt-1">Overall trends for the series you follow.</h4>
          </div>
          <div className="flex-1 flex flex-col @md:flex-row @md:items-center justify-end gap-4">
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl text-xs font-bold max-w-[222px] w-full">
              <button className="py-1 rounded-xl uppercase hover:bg-background hover:shadow-sm hover:text-emph">Weekly</button>
              <button className="py-1 rounded-xl uppercase hover:bg-background hover:shadow-sm hover:text-emph">Monthly</button>
            </div>
            <button className="flex-1 md:flex-none md:shrink-0 bg-primary text-white flex items-center justify-center gap-4 px-6 py-2 text-sm font-bold rounded-full shadow-lg shadow-primary/20"><Plus className="h-4 w-auto" />Add Webtoon</button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-2xl text-white relative shadow-lg shadow-primary/20">
            <p className="text-white/80 font-medium">Avg. Weekly Growth</p>
            <h2 className="text-white mt-1 mb-4">4.2%</h2>
            <p className="text-sm bg-white/20 rounded-full max-w-fit px-3 py-1 font-medium">based on latest weekly snapshot</p>
            <ChartNoAxesCombined className="h-30 w-auto text-white/10 absolute top-4 right-4" />
          </div>
          <div className="bg-card p-6 shadow-sm rounded-2xl flex flex-col justify-center">
            <p className="font-medium">Active Series</p>
            <h2 className="mt-1 mb-2">3</h2>
            <p className="text-sm">2 Ongoing, 1 Hiatus, 1 Completed</p>
          </div>
          <div className="bg-card p-6 shadow-sm rounded-2xl flex flex-col justify-center">
            <p className="font-medium">Top Genre</p>
            <h2 className="mt-1 mb-2">Fantasy</h2>
            <p className="text-sm">3 Webtoons share</p>
          </div>
          <div className="bg-card p-6 shadow-sm rounded-2xl flex flex-col justify-center">
            <p className="font-medium">Busiest Day</p>
            <h2 className="mt-1 mb-2">Saturday</h2>
            <p className="text-sm">3 Webtoons update</p>
          </div>
          <div className="md:col-span-2 bg-green-50/50 p-6 shadow-sm rounded-2xl flex items-center justify-between gap-4 min-h-[160px]">
            <div className="flex gap-4">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-auto text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Top Performer</p>
                <h3 className="line-clamp-2">The Price is Your Everything</h3>
              </div>
            </div>
            <div>
              <p className="font-bold text-green-600">+12.5%</p>
              <p className="text-xs">this week</p>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h3>Portfolio Growth</h3>
            <div className="bg-card shadow-sm rounded-2xl p-6 mt-6">
              <h4 className="font-semibold font-headings text-emph">Growth % Trend</h4>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 100%, 40%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(150, 100%, 40%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} />
                    <YAxis tick={false} axisLine={false} width={0} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="hsl(150, 100%, 40%)" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div>
            <h3>Top Series</h3>
            <div className="bg-card shadow-sm rounded-2xl mt-6">
              <h4 className="p-6 font-semibold font-headings text-emph">Ranking</h4>
              <article className="grid grid-cols-[1fr_4.6rem_7rem] text-xs">
                <div className="uppercase font-bold tracking-wider pl-6 py-3 pr-2 bg-slate-100">Series</div>
                <div className="uppercase font-bold tracking-wider px-2 py-3 bg-slate-100 text-right">Subs</div>
                <div className="uppercase font-bold tracking-wider pl-2 py-3 pr-6 bg-slate-100 text-right">Wkly %</div>
                <div className="col-span-3 lg:h-[264px] overflow-y-auto text-sm text-emph">
                  <div className="grid grid-cols-[1fr_4.6rem_7rem] py-4 items-center border-t border-slate-200">
                    <div className="font-bold pl-6 pr-2 line-clamp-2">The Price is Your Everything</div>
                    <div className="font-medium px-2 text-right">124.5K</div>
                    <div className="font-bold pl-2 pr-6 text-right flex items-center justify-end gap-1 text-green-600"><ArrowUpRight className="h-4 w-auto" />12.5%</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4.6rem_7rem] py-4 items-center border-t border-slate-200">
                    <div className="font-bold pl-6 pr-2 line-clamp-2">The Price is Your Everything</div>
                    <div className="font-medium px-2 text-right">124.5K</div>
                    <div className="font-bold pl-2 pr-6 text-right flex items-center justify-end gap-1 text-green-600"><ArrowUpRight className="h-4 w-auto" />12.5%</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4.6rem_7rem] py-4 items-center border-t border-slate-200">
                    <div className="font-bold pl-6 pr-2 line-clamp-2">The Price is Your Everything</div>
                    <div className="font-medium px-2 text-right">124.5K</div>
                    <div className="font-bold pl-2 pr-6 text-right flex items-center justify-end gap-1 text-green-600"><ArrowUpRight className="h-4 w-auto" />12.5%</div>
                  </div>
                  <div className="grid grid-cols-[1fr_4.6rem_7rem] py-4 items-center border-t border-slate-200">
                    <div className="font-bold pl-6 pr-2 line-clamp-2">The Price is Your Everything</div>
                    <div className="font-medium px-2 text-right">124.5K</div>
                    <div className="font-bold pl-2 pr-6 text-right flex items-center justify-end gap-1 text-green-600"><ArrowUpRight className="h-4 w-auto" />12.5%</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
