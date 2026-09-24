"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Trope } from "@/types/trope";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";

export default function GlossaryClient({ tropesData, examples }: { tropesData: Trope[]; examples: (Toon | Comp)[]; }) {

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }
  
  const filteredData = tropesData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <section className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl">Trope Glossary</h1>
          <p className="mt-1 text-slate-500">A dictionary of common webtoon tropes based on <a href="https://tvtropes.org/" target="_blank" rel="noopener noreferrer" className="underline">TV Tropes</a>.</p>
        </div>
        <div className="bg-white border border-slate-200 focus-within:border-primary-five/40 rounded-full text-sm flex items-center gap-2 py-2 px-3 max-w-md w-full">
          <i className="ri-search-line"></i>
          <input type="text" placeholder="Search..." className="outline-none flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </section>
      <section>
        {filteredData.map((t, index) => {
          const relevantExamples = examples.filter(e => e.tags.includes(t._id));
          return (
            <div key={t._id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary-five/40 transition-colors" onClick={() => toggle(index)}>
              <button className="flex items-center justify-between gap-4 w-full cursor-pointer">
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
                      {r.title}
                      {index < t.related.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>}
                {relevantExamples.length > 0 && <p className="text-xs">
                  <span className="font-semibold">Examples: </span>
                  {relevantExamples.map((e, index) => (
                    <React.Fragment key={index}>
                      <Link key={index} href={"days" in e ? `/library/${e.id}` : "/archive"} className="text-primary-seven hover:text-primary-six">{e.title}</Link>
                      {index < relevantExamples.length - 1 && ", "}
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