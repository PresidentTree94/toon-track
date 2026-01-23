import { Users, ArrowUpRight } from "lucide-react";

export default function Webtoon() {
  return (
    <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img src="/WebtoonThumbnail.jpg" alt="Webtoon Title" className="w-full group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-4 right-4 bg-black/20 py-0.5 px-2 text-xs uppercase font-medium text-white rounded-xl tracking-wider backdrop-blur-md">Genre</span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider">Subscribers</p>
        <div className="flex items-end justify-between mt-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-auto text-primary" />
            <span className="text-2xl font-headings font-bold text-emph">124.5k</span>
          </div>
          <p className="bg-green-100 text-green-700 py-1 px-2 flex items-center gap-1 text-sm font-bold rounded-2xl"><ArrowUpRight className="h-4 w-auto" />12.5%</p>
        </div>
      </div>
    </div>
  );
}