"use client";
import IconStat from "@/components/IconStat";
import Webtoon from "@/components/Webtoon";
import { LayoutDashboard, Compass, BookOpen, Search, Plus, ChartNoAxesCombined, TrendingUp, ChevronsUp, ArrowUpRight } from "lucide-react";
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
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1>Overview</h1>
            <h4 className="mt-1">Overall trends for the series you follow.</h4>
          </div>
          <button className="bg-primary text-white flex items-center justify-center gap-4 px-6 py-2 text-sm font-bold rounded-full shadow-lg shadow-primary/20"><Plus className="h-4 w-auto" />Add Webtoon</button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 @container">
          <div className="bg-primary p-7 rounded-2xl text-white relative shadow-lg shadow-primary/20">
            <p className="text-white/80 font-medium">Avg. Monthly Growth</p>
            <h2 className="text-white mt-1 mb-2">4.2%</h2>
            <p className="text-sm text-white/60 font-medium">Across 80 Webtoons</p>
            <ChartNoAxesCombined className="h-32 w-auto text-white/10 absolute top-4 right-4" />
          </div>
          <div className="bg-card p-7 shadow-sm rounded-2xl">
            <p className="font-medium">Active Series</p>
            <h2 className="mt-1 mb-2">3</h2>
            <p className="text-sm">2 Ongoing, 1 Hiatus, 1 Completed</p>
          </div>
          <IconStat
            topClass="md:row-start-1 md:col-start-2 lg:col-start-3 md:row-span-2 md:flex-col! justify-center"
            middleClass="md:flex-none md:text-center! md:space-y-4!"
            bottomClass="md:text-center!"
            icon={ChevronsUp}
            topic="Biggest Leap"
            number="+1,200"
          />
          <IconStat
            topClass="bg-green-50/50 md:col-span-2"
            icon={TrendingUp}
            topic="Top Percent"
            number="+12.5%"
          />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
