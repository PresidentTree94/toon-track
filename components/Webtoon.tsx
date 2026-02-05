import { Users, BookOpen, HeartHandshake, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Toon } from "@/types/toon";
import { calcMedianGrowth, condenseValue } from "@/utils/calculations";
import { STATUS_COLORS } from "@/utils/constants";

export default function Webtoon({ data }:Readonly<{ data: Toon; }>) {

  const link = data.title.toLowerCase().replace(":", "").split(" ").join("-");
  const temp = data.title.split(" ").join("+");

  return (
    <Link href={link} className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-143/200">
        <img src={data.thumbnail ?? `https://placehold.co/143x200?text=${temp}`} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-end items-start gap-2">
          <span className="text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{data.genre}</span>
          <h2 className="text-white">{data.title}</h2>
        </div>
      </div>
      <div className="p-4 text-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2"><Users className="h-4 w-auto" />Subscribers</div>
          <span className="text-lg font-bold font-mono text-emph">{data.data.length > 0 ? condenseValue(data.data[data.data.length - 1].value) : 0}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-auto" />Status</div>
          <span className={`font-semibold ${STATUS_COLORS[data.status]}`}>{data.status}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2"><HeartHandshake className="h-4 w-auto" />Owner</div>
          <span className="font-semibold">{data.owner}</span>
        </div>
        <div className="border border-slate-200 p-2 rounded-xl flex items-center gap-2">
          <TrendingUp className="h-4 w-auto text-green-500" />
          <span className="font-bold text-green-500">{data.data.length > 1 ? calcMedianGrowth(data.data[data.data.length - 2].value, data.data[data.data.length - 1].value).toFixed(0) : 0}%</span>
          growth this week
        </div>
      </div>
    </Link>
  );
}