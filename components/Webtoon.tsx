import { Users, BookOpen, TrendingDown, TrendingUp } from "lucide-react";

export type Toon = {
  title: string;
  genre: string;
  cover: string;
  subs: number;
  status: string;
  growth: number;
}

export default function Webtoon({ data }:Readonly<{ data: Toon; }>) {

  let statusColor;
  switch (data.status) {
    case "Ongoing":
      statusColor = "text-green-500";
      break;
    case "Completed":
      statusColor = "text-blue-400";
      break;
  }

  return (
    <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-143/200">
        <img src={data.cover} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-end items-start gap-2">
          <span className="text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{data.genre}</span>
          <h2 className="text-white">{data.title}</h2>
        </div>
      </div>
      <div className="p-4 text-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2"><Users className="h-4 w-auto" />Subscribers</div>
          <span className="text-lg font-bold font-mono text-emph">{data.subs.toFixed(1)}k</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-auto" />Status</div>
          <span className={`font-semibold ${statusColor}`}>{data.status}</span>
        </div>
        <div className="border border-slate-200 p-2 rounded-xl flex items-center gap-2">
          <TrendingUp className="h-4 w-auto text-green-500" />
          <span className="font-bold text-green-500">{data.growth}%</span>
          growth this week
        </div>
      </div>
    </div>
  );
}