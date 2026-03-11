"use client";
import { BookHeart, LayoutDashboard, Library, Archive, Settings, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "./Modal";
import FormField from "./FormField";
import { createWebtoon } from "@/lib/data/webtoonQueries";
import { useForm } from "@presidenttree94/form-utils";

export default function Navbar() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const webtoonForm = useForm(
    {
      toon: "",
      thumbnail: "",
      authors: "",
      protagonists: "",
      owner: ""
    },
    {
      toon: { label: "Webtoon Link", type: "url", required: true },
      thumbnail: { label: "Thumbnail Link", type: "url" },
      authors: { label: "Author(s)" },
      protagonists: { label: "Protagonist(s)" },
      owner: { label: "Owner", required: true, options: ["Karly", "Rachelle", "Shared"], defaultOption: "Select Owner" }
    }
  );

  const links = [
    {label: "Dashboard", icon: LayoutDashboard, link: "/"},
    {label: "Library", icon: Library, link: "/library"},
    {label: "Archive", icon: Archive, link: "/archive"},
  ];

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createWebtoon({
      toon: webtoonForm.form.toon.trim(),
      thumbnail: webtoonForm.form.thumbnail.trim() || null,
      authors: webtoonForm.form.authors.trim(),
      protagonists: webtoonForm.form.protagonists.trim(),
      owner: webtoonForm.form.owner
    });
    setOpen(false);
  }

  return (
    <>
      <header className="bg-card/80 backdrop-blur-xl border-t md:border-b md:border-t-0 border-slate-200 grid grid-cols-[1fr_3fr_2fr] md:grid-cols-[auto_auto_1fr] md:items-center justify-between md:gap-8 h-16 md:px-8 fixed w-full bottom-0 md:top-0 md:bottom-auto z-2 pb-0 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-center gap-3">
          <BookHeart className="text-primary" />
          <h3 className="hidden md:inline">ToonTrack</h3>
        </div>
        <nav className="grid grid-cols-[repeat(3,auto)] text-sm font-medium md:gap-1">
          {links.map((l, index) =>
            <Link key={index} href={l.link} className={`md:py-2 md:px-4 md:rounded-full ${pathname === l.link ? "bg-primary text-white" : "hover:bg-slate-100"} flex justify-center items-center`}><l.icon className="md:hidden" /><span className="hidden md:inline">{l.label}</span></Link>
          )}
        </nav>
        <div className="grid grid-cols-[repeat(2,auto)] md:gap-8 md:justify-end md:items-center">
          <button className="md:bg-primary text-white md:px-6 md:py-2 md:rounded-full text-sm font-bold gap-2 md:shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center" onClick={() => setOpen(true)}><Plus className="bg-primary p-1 h-8 w-auto rounded-full md:hidden" /><span className="hidden md:inline">Add Webtoon</span></button>
          <Link href="/settings" className={`flex items-center justify-center md:p-2 md:rounded-full ${pathname === "/settings" && "bg-primary text-white"}`}>
            <Settings />
          </Link>
        </div>
      </header>
      <Modal heading="Add Webtoon to Tracker" open={open} setOpen={setOpen} handleSubmit={handleSubmit}>
        {Object.entries(webtoonForm.elements).map(([key, field]) => (
          <FormField key={key} field={field} />
        ))}
      </Modal>
    </>
  );
}