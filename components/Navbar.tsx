"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "@presidenttree94/form-utils";
import { createWebtoon } from "@/lib/data/clientQueries";
import Modal from "./Modal";

const nav = [
  { text: "Library", icon: "ri-book-shelf-line" },
  { text: "Archive", icon: "ri-archive-line" }
];

export default function Navbar() {

  const { form, elements } = useForm({
    toon: "",
    thumbnail: "",
    authors: "",
    protagonists: "",
    owner: ""
  }, {
    toon: { label: "Webtoon Link", type: "url", required: true },
    thumbnail: { label: "Thumbnail Link", type: "url" },
    authors: { label: "Author(s)" },
    protagonists: { label: "Protagonist(s)" },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], defaultOption: "Select Owner", required: true }
  });

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createWebtoon({
      toon: form.toon.trim(),
      thumbnail: form.thumbnail.trim() || "",
      authors: form.authors.trim(),
      protagonists: form.protagonists.trim(),
      owner: form.owner
    });
    setOpen(false);
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl fixed inset-x-0 top-0 border-b border-slate-200 z-2">
        <div className="grid grid-cols-[1fr_2fr_1fr] sm:grid-cols-[auto_auto_auto] sm:items-center justify-between sm:gap-3 h-16 sm:px-8 max-w-[1400px] mx-auto">
          <Link href="/" className="flex sm:items-center gap-2 text-xl sm:text-lg">
            <div className={`${pathname === "/" ? "bg-primary-five text-white" : "sm:bg-primary-five text-primary-five sm:text-white"} w-full sm:w-8 sm:h-8 sm:rounded-lg flex justify-center items-center`}>
              <i className="ri-book-open-line"></i>
            </div>
            <h3 className="font-bold hidden sm:block">ToonTrack</h3>
          </Link>
          <nav className="grid grid-cols-2 sm:grid-cols-[auto_auto] sm:gap-1 text-xl sm:text-sm sm:font-medium">
            {nav.map((n, index) => {
              const link = "/" + n.text.toLowerCase();
              return (
                <Link key={index} href={link} className={`${pathname === link ? "bg-primary-five text-white" : "hover:bg-slate-100 text-slate-700"} sm:py-2 sm:px-4 sm:rounded-full flex items-center justify-center`}><i className={`${n.icon} sm:hidden`}></i><span className="hidden sm:block">{n.text}</span></Link>
              );
            })}
          </nav>
          <button className="self-center justify-self-center aspect-square sm:aspect-auto h-10 sm:h-auto bg-primary-five hover:bg-primary-six text-white sm:px-4 sm:py-2 text-xl sm:text-sm rounded-full sm:font-bold flex justify-center items-center gap-2 cursor-pointer" onClick={() => setOpen(true)}><i className="ri-add-line"></i><span className="hidden sm:block">Add Webtoon</span></button>
        </div>
      </header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add Webtoon"
        elements={elements}
        handleSubmit={handleSubmit}
      />
    </>
  );
}