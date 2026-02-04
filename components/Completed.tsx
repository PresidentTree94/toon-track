import { Comp } from "@/types/comp";
import { ICONS } from "@/utils/constants";

export default function Completed({ data }:Readonly<{ data: Comp; }>) {

  const temp = data.title.split(" ").join("+");
  const Icon = ICONS[data.owner];

  return (
    <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-143/200">
        <img src={data.thumbnail ?? `https://placehold.co/143x200?text=${temp}`} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-end items-start gap-2">
          <span className="text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{data.genre}</span>
          <h2 className="text-white">{data.title}</h2>
        </div>
      </div>
      <div className="p-4 text-sm grid grid-rows-[auto_1fr_auto] gap-3">
        <div><i>{data.authors}</i></div>
        <div className="font-semibold">{data.protagonists}</div>
        <div className="flex items-center gap-2 border border-slate-200 p-2 rounded-xl"><Icon className="h-4 w-auto text-primary" />{data.owner}</div>
      </div>
    </div>
  );
}