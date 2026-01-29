"use client";
import Stat from "@/components/Stat";
import { LayoutDashboard, Compass, BookOpen, Plus, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Home() {

  const links = [
    {label: "Dashboard", icon: LayoutDashboard},
    {label: "Explore", icon: Compass},
    {label: "Library", icon: BookOpen},
    {label: "Trends", icon: TrendingUp}
  ];

  const data = [
    {month: "Jan 25", value: 10},
    {month: "Feb 25", value: 12},
    {month: "Mar 25", value: 8},
    {month: "Apr 25", value: 5}
  ]

  return (
    <>
      <header className="bg-card/80 backdrop-blur-xl border-t md:border-b md:border-t-0 border-slate-200 grid grid-cols-[1fr_4fr_1fr] md:grid-cols-[auto_auto_1fr] md:items-center justify-between md:gap-8 h-16 md:px-8 fixed w-full bottom-0 md:top-0 md:bottom-auto z-1">
        <div className="flex items-center justify-center gap-3">
          <span>icon</span>
          <h3 className="hidden md:inline">ToonTrack</h3>
        </div>
        <nav className="grid grid-cols-[repeat(4,auto)] text-sm font-medium md:gap-1">
          {links.map((l, index) =>
            <a key={index} className="py-2 px-4 rounded-full hover:bg-slate-100 flex justify-center items-center"><l.icon className="md:hidden" /><span className="hidden md:inline">{l.label}</span></a>
          )}
        </nav>
        <div className="flex items-center justify-center md:justify-self-end">profile</div>
      </header>
      <main className="max-w-7xl mx-auto mb-16 md:mt-16 md:mb-0 p-8 space-y-8">
        <section className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center gap-4">
          <div>
            <h1>Dashboard</h1>
            <h4 className="mt-1">Your Webtoons analytics overview</h4>
          </div>
          <button className="bg-primary text-white px-6 py-2 flex items-center rounded-full text-sm font-bold gap-2 shadow-lg shadow-primary/20"><Plus className="h-4 w-auto" />Add Webtoon</button>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat heading="Median Growth" number="0%" />
          <Stat heading="Active Series" subheading="0 Hiatus, 0 Completed" />
          <Stat heading="Median Subs" />
          <Stat heading="Sub Change" />
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
                  <th className="text-left">Day(s)</th>
                  <th className="text-right">Subs</th>
                  <th className="text-right">Growth</th>
                </tr>
              </thead>
              <tbody className="text-emph">
                <tr className="border-t border-slate-200">
                  <td className="text-center font-bold">0</td>
                  <td className="text-left font-semibold"><div className="line-clamp-2">The Price is Your Everything</div></td>
                  <td className="text-left text-xs font-semibold"><span className="border px-2.5 py-0.5 rounded-xl inline-block">Drama</span></td>
                  <td className="text-left"><span className="text-xs font-semibold px-2 py-1 rounded-full text-green-500 bg-green-500/15">ONGOING</span></td>
                  <td className="text-left font-semibold">Wed</td>
                  <td className="text-right font-mono font-bold">600,000</td>
                  <td className="text-right text-green-500 font-bold">4.2%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="text-center font-bold">0</td>
                  <td className="text-left font-semibold"><div className="line-clamp-2">The Price is Your Everything</div></td>
                  <td className="text-left text-xs font-semibold"><span className="border px-2.5 py-0.5 rounded-xl inline-block">Drama</span></td>
                  <td className="text-left"><span className="text-xs font-semibold px-2 py-1 rounded-full text-green-500 bg-green-500/15">ONGOING</span></td>
                  <td className="text-left font-semibold">Wed</td>
                  <td className="text-right font-mono font-bold">600,000</td>
                  <td className="text-right text-green-500 font-bold">4.2%</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="text-center font-bold">0</td>
                  <td className="text-left font-semibold"><div className="line-clamp-2">The Price is Your Everything</div></td>
                  <td className="text-left text-xs font-semibold"><span className="border px-2.5 py-0.5 rounded-xl inline-block">Drama</span></td>
                  <td className="text-left"><span className="text-xs font-semibold px-2 py-1 rounded-full text-green-500 bg-green-500/15">ONGOING</span></td>
                  <td className="text-left font-semibold">Wed</td>
                  <td className="text-right font-mono font-bold">600,000</td>
                  <td className="text-right text-green-500 font-bold">4.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="mb-4">Media Growth Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={14} />
              <YAxis width="auto" fontSize={14} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(150, 100%, 40%)" fill="hsl(150, 100%, 40%)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section>
          <h2 className="mb-4">Median Subs Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={14} />
              <YAxis width="auto" fontSize={14} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(150, 100%, 40%)" fill="hsl(150, 100%, 40%)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section>
          <h2 className="mb-4">Sub Change Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={14} />
              <YAxis width="auto" fontSize={14} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(150, 100%, 40%)" fill="hsl(150, 100%, 40%)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      </main>
    </>
  );
}
