"use client";
import { useState } from "react";
import { Toon } from "@/types/toon";
import { Trope } from "@/types/trope";
import { OWNER_ICONS } from "@/utils/constants";
import { calcMedianGrowth, condenseValue } from "@/utils/calculations";
import Gallery from "@/components/Gallery";
import { useForm } from "@presidenttree94/form-utils";
import Link from "next/link";
import Status from "@/components/Status";

export default function LibraryClient({ webtoonsData, tropesData }: { webtoonsData: Toon[]; tropesData: Trope[]; }) {

  const [search, setSearch] = useState("");
  const { form, elements } = useForm({
    owner: [] as string[],
    status: "All",
    genre: "All",
    day: "All",
    tags: [] as string[]
  }, {
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    status: { label: "Status", options: ["All", "Ongoing", "Hiatus"] },
    genre: { label: "Genre", options: ["All", ...[...new Set(webtoonsData.map(item => item.genre))].sort()] },
    day: { label: "Day", options: ["All", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Random"] },
    tags: { label: "Tags", options: tropesData.map(t => t._id), multi: true }
  });

  const filteredData = webtoonsData
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.protagonists.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => form.owner.length === 0 || form.owner.includes(item.owner))
  .filter(item => form.status === "All" ? true : item.status === form.status)
  .filter(item => form.genre === "All" ? true : item.genre === form.genre)
  .filter(item => form.day === "All" ? true : item.days.includes(form.day))
  .filter(item => form.tags.length === 0 || form.tags.some(tag => item.tags.includes(tag)));

  return (
    <Gallery title="Library" subtitle="active" totalData={webtoonsData} filteredData={filteredData} filters={{ search, setSearch, elements }} tropesData={tropesData}>
      {filteredData.map(w => {
        const latestSubs = w.data.length > 0 ? w.data.at(-1)!.value : -1;
        const latestGrowth = w.data.length > 1 ? calcMedianGrowth(w.data.at(-2)!.value, latestSubs) : -1;
        const growthColor = latestGrowth > 0.05 ? "text-emerald-500" : latestGrowth < 0 ? "text-rose-600" : "text-slate-400";
        return (
          <Link key={w.id} href={`/library/${w.id}`} className="group bg-white border border-slate-200 hover:border-primary-five/40 rounded-2xl overflow-hidden transition-colors flex flex-col">
            <div className="relative aspect-2/3 overflow-hidden">
              <img src={w.thumbnail || `https://placehold.co/143x200?text=${w.title.replaceAll(" ", "+")}`} alt={w.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
                <Status status={w.status} ongoing="text-emerald-700 bg-emerald-400" hiatus="text-amber-700 bg-amber-400" className="self-end" />
                <h3 className="text-white font-bold text-2xl line-clamp-4">{w.title}</h3>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex gap-1.5 text-xs font-semibold">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{w.genre}</span>
                {w.days.split(", ").map((d, index) => (
                  <span key={index} className="bg-primary-one text-primary-seven px-2 py-1 rounded-full flex items-center gap-1"><i className="ri-calendar-line"></i>{d}</span>
                ))}
              </div>
              <p className="text-sm italic flex-1">{w.protagonists}</p>
              <span className="text-sm text-slate-600 flex items-center gap-1.5"><i className={OWNER_ICONS[w.owner]}></i>{w.owner}</span>
              <div className="flex justify-between items-center font-bold">
                <span className="font-mono">{latestSubs !== -1 ? condenseValue(latestSubs) : "—"}</span>
                <span className={`text-sm ${growthColor}`}>{latestGrowth !== -1 ? condenseValue(latestGrowth) + "%" : "—"}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </Gallery>
  );
}