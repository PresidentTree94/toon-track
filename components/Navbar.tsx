"use client";
import { BookHeart, LayoutDashboard, Library, Archive, Settings, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {label: "Dashboard", icon: LayoutDashboard, link: "/"},
    {label: "Library", icon: Library, link: "/library"},
    {label: "Archive", icon: Archive, link: "/archive"},
  ];

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
          <div className="flex items-center justify-center">
            <Settings />
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 bg-black/50 z-3 ${open ? "flex" : "hidden"} justify-center items-center`}>
        <div className="card m-8">
          <h2 className="text-center">Add Webtoon to Tracker</h2>
          <form className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 mt-6 items-center">
            <label>Webtoon Link:</label>
            <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" />
            <label>Thumbnail Link:</label>
            <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" />
            <label>Protagonist(s):</label>
            <input type="text" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" />
            <label>Owner:</label>
            <select defaultValue="" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary appearance-none">
              <option value="" disabled>Select owner</option>
              <option value="Karly">Karly</option>
              <option value="Rachelle">Rachelle</option>
              <option value="Shared">Shared</option>
            </select>
            <div className="col-span-full grid grid-cols-2 gap-4 mt-6">
              <button className="text-sm bg-primary text-white shadow-lg shadow-primary/20 py-2 rounded-2xl font-semibold">Submit</button>
              <button className="text-sm border text-emph py-2 rounded-2xl font-semibold cursor-pointer" onClick={() => setOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}