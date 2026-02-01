"use client";
import { BookHeart, LayoutDashboard, Library, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {

  const pathname = usePathname();

  const links = [
    {label: "Dashboard", icon: LayoutDashboard, link: "/"},
    {label: "Library", icon: Library, link: "/library"},
  ];

  return (
    <header className="bg-card/80 backdrop-blur-xl border-t md:border-b md:border-t-0 border-slate-200 grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[auto_auto_1fr] md:items-center justify-between md:gap-8 h-16 md:px-8 fixed w-full bottom-0 md:top-0 md:bottom-auto z-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-center gap-3">
        <BookHeart className="text-primary" />
        <h3 className="hidden md:inline">ToonTrack</h3>
      </div>
      <nav className="grid grid-cols-[repeat(2,auto)] text-sm font-medium md:gap-1">
        {links.map((l, index) =>
          <Link key={index} href={l.link} className={`md:py-2 md:px-4 md:rounded-full ${pathname === l.link ? "bg-primary text-white" : "hover:bg-slate-100"} flex justify-center items-center`}><l.icon className="md:hidden" /><span className="hidden md:inline">{l.label}</span></Link>
        )}
      </nav>
      <div className="flex items-center justify-center md:justify-self-end"><Settings /></div>
    </header>
  );
}