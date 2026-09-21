import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-xl fixed inset-x-0 top-0 border-b border-slate-200 z-1">
      <div className="flex items-center justify-between gap-3 h-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-lg">
          <div className="bg-primary-five w-8 h-8 rounded-lg flex justify-center items-center text-white">
            <i className="ri-book-open-line"></i>
          </div>
          <h3 className="font-bold">ToonTrack</h3>
        </div>
        <nav className="flex gap-1 text-sm font-medium">
          <Link href="/library" className="bg-slate-200 py-2 px-4 rounded-full text-slate-700">Library</Link>
        </nav>
        <button className="bg-primary-five hover:bg-primary-six text-white px-4 py-2 text-sm rounded-full font-bold flex items-center gap-2"><i className="ri-add-line"></i>Add Webtoon</button>
      </div>
    </header>
  );
}