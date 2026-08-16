import { Users, BookOpen, HeartHandshake, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Toon } from "@/types/toon";
import { calcMedianGrowth, condenseValue } from "@/utils/calculations";
import { STATUS_COLORS, WEBTOON_TAG_MARKERS } from "@/utils/constants";

export default function Webtoon({ data }:Readonly<{ data: Toon; }>) {

  const { id, title, thumbnail, tags, genre, data: subs, status, owner } = data;

  return (
    <Link href={`/library/${id}`} className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-143/200">
        <Image src={thumbnail || `https://placehold.co/143x200?text=${id}`} alt={title} fill sizes="100%" className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
        <div className="self-end flex gap-2 text-primary">
          {tags.map(t => {
            const Icon = WEBTOON_TAG_MARKERS[t];
            return Icon ? <Icon key={t} className="h-6" /> : null;
          })}
        </div>
        <div className="space-y-2">
          <span className="inline-block text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{genre}</span>
          <h2 className="text-white">{title}</h2>
        </div>
        </div>
      </div>
      <div className="p-4 text-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2"><Users className="h-4 w-auto" />Subscribers</div>
          <span className="text-lg font-bold font-mono text-emph">{subs.length > 0 ? condenseValue(subs[subs.length - 1].value) : ""}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-auto" />Status</div>
          <span className={`font-semibold ${STATUS_COLORS[status]}`}>{status}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2"><HeartHandshake className="h-4 w-auto" />Owner</div>
          <span className="font-semibold">{owner}</span>
        </div>
        <div className="border border-slate-200 p-2 rounded-xl flex items-center gap-2">
          <TrendingUp className="h-4 w-auto text-green-500" />
          <span className="font-bold text-green-500">{subs.length > 1 ? condenseValue(calcMedianGrowth(subs[subs.length - 2].value, subs[subs.length - 1].value)) : ""}%</span>
          growth this month
        </div>
      </div>
    </Link>
  );
}