"use client";
import { useState } from "react";
import { Comp } from "@/types/comp";
import { OWNER_ICONS } from "@/utils/constants";
import Gallery from "@/components/Gallery";
import { useForm } from "@presidenttree94/form-utils";
import Status from "@/components/Status";

export default function ArchiveClient({ completedData }: { completedData: Comp[] }) {

  const [search, setSearch] = useState("");
  const { form, elements } = useForm({
    owner: [] as string[],
    genre: "All",
    tags: [] as string[]
  }, {
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    genre: { label: "Genre", options: ["All", ...[...new Set(completedData.map(item => item.genre))].sort()] },
    tags: { label: "Tags", options: [], multi: true }
  });

  const filteredData = completedData
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.protagonists.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => form.owner.length === 0 || form.owner.includes(item.owner))
  .filter(item => form.genre === "All" ? true : item.genre === form.genre);

  return (
    <Gallery title="Archive" subtitle="completed" totalData={completedData} filteredData={filteredData} filters={{ search, setSearch, elements }}>
      {filteredData.map(c => (
        <div key={c.id} className="group bg-white border border-slate-200 hover:border-primary-five/40 rounded-2xl overflow-hidden transition-colors flex flex-col">
          <div className="relative aspect-2/3 overflow-hidden">
            <img src={c.thumbnail || `https://placehold.co/143x200?text=${c.title.replaceAll(" ", "+")}`} alt={c.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
              <Status status="Completed" className="self-end" />
              <h3 className="text-white font-bold text-2xl line-clamp-4">{c.title}</h3>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 flex-1">
            <div className="flex gap-1.5 text-xs font-semibold">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{c.genre === "Graphic Novel" ? "Graphic" : c.genre}</span>
              <span className="bg-primary-one text-primary-seven px-2 py-1 rounded-full flex items-center gap-1"><i className="ri-calendar-line"></i>{new Date(c.timestamp).toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" })}</span>
            </div>
            <p className="text-sm italic flex-1">{c.protagonists}</p>
            <span className="text-sm text-slate-600 flex items-center gap-1.5"><i className={OWNER_ICONS[c.owner]}></i>{c.owner}</span>
            <button className="mt-2 bg-primary-five group-hover:bg-primary-six text-white px-4 py-2 rounded-full text-sm font-bold w-full">Edit</button>
          </div>
        </div>
      ))}
    </Gallery>
  );
}