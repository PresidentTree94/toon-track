"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Trope } from "@/types/trope";

export default function GlossaryClient({ tropesData }: { tropesData: Trope[] }) {

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }
  
  const filteredData = tropesData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <section className="flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left gap-8">
        <div>
          <h1 className="text-4xl">Trope Glossary</h1>
          <p className="mt-1 text-slate-500">A dictionary of common webtoon tropes based on <a href="https://tvtropes.org/" target="_blank" rel="noopener noreferrer" className="underline text-primary-five hover:text-primary-six">TV Tropes</a>.</p>
        </div>
        <div className="bg-white border border-slate-200 focus-within:border-primary-five/40 rounded-full text-sm flex items-center gap-2 py-2 px-3 max-w-md w-full">
          <i className="ri-search-line"></i>
          <input type="text" placeholder="Search..." className="outline-none flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </section>
      <section className="space-y-4">
        {filteredData.map((t, index) => {
          return (
            <div key={t._id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary-five/40 transition-colors">
              <button className="flex items-center justify-between gap-4 w-full cursor-pointer" onClick={() => toggle(index)}>
                <h2>{t.title}</h2>
                <i className={`${openIndex === index ? "rotate-180" : ""} ri-arrow-down-s-line transition-transform text-xl text-slate-400`}></i>
              </button>
              <div className={`text-slate-600 text-sm space-y-3 mt-5 ${openIndex === index ? "block" : "hidden"}`}>
                {t.description ? <PortableText value={t.description} /> : <p>Description goes here.</p>}
                {t.references && <p className="text-xs">
                  <span className="font-semibold">References: </span>
                  {t.references.map((r, index) => (
                    <React.Fragment key={index}>
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-primary-seven hover:text-primary-six">{r.label}</a>
                      {index < t.references.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>}
                {t.related && <p className="text-xs"><span className="font-semibold">Related: </span>
                  {t.related.map((r, index) => (
                    <React.Fragment key={index}>
                      <button className="text-primary-seven hover:text-primary-six cursor-pointer" onClick={() => toggle(filteredData.findIndex(f => f._id === r._id))}>{r.title}</button>
                      {index < t.related.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}