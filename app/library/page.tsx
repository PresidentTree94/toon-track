"use client";
import { Search, Funnel } from "lucide-react";
import Webtoon from "@/components/Webtoon";
import { useState } from "react";

export default function Library() {

  const data = [
    {title: "Duchess in Ruins", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/833243/thumbnail/thumbnail_IMAG21_ea781ae5-07d1-478b-b9d0-86ebbfc4d9ea.jpg", status: "Ongoing", subs: 1, growth: 2},
    {title: "The Count's Secret Maid", genre: "Drama", cover: "https://image-comic.pstatic.net/webtoon/830106/thumbnail/thumbnail_IMAG21_c2616743-6c0a-47d9-af22-bc8dfe5c7b5b.jpg", status: "Ongoing", subs: 2, growth: 1.75},
    {title: "The Price is Your Everything", genre: "Drama", cover: "https://image-comic.pstatic.net/webtoon/817998/thumbnail/thumbnail_IMAG21_070dfac2-b3d0-47ac-a3a6-e28e62342119.jpg", status: "Ongoing", subs: 3, growth: 1.5},
    {title: "Noble in Name, Vulgar at Heart", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/839386/thumbnail/thumbnail_IMAG21_5525eed5-542b-433f-b6d5-02861139d9b9.jpg", status: "Ongoing", subs: 4, growth: 1.25},
    {title: "Life of a Quack Healer", genre: "Fantasy", cover: "https://image-comic.pstatic.net/webtoon/808757/thumbnail/thumbnail_IMAG21_334dccd8-0a91-4063-84b0-77f0fcb85245.jpg", status: "Ongoing", subs: 5, growth: 1},
    {title: "For My Derelict Favorite", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/794155/thumbnail/thumbnail_IMAG21_02e36070-2f60-49c1-849a-ceae6e2d1847.jpg", status: "Ongoing", subs: 6, growth: 0.75},
    {title: "Your Ryan", genre: "Romance", cover: "https://image-comic.pstatic.net/webtoon/841490/thumbnail/thumbnail_IMAG21_83cf1102-b8b4-44e0-8ccf-44a585821ddc.jpg", status: "Ongoing", subs: 7, growth: 0.5},
    {title: "The Age of Arrogance", genre: "Fantasy", cover: "https://image-comic.pstatic.net/webtoon/814538/thumbnail/thumbnail_IMAG21_37b888c5-d7d7-4722-95b2-2be5687efdda.jpg", status: "Completed", subs: 8, growth: 0.25}
  ]

  const sorts = ["Title", "Subscribers", "Growth"];
  const statuses = ["All", "Ongoing", "Hiatus", "Completed"];
  const genres = ["All", ...new Set(data.map(item => item.genre))].sort();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [status, setStatus] = useState("All");
  const [genre, setGenre] = useState("All");

  const filtered = data
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(item => status === "All" ? true : item.status === status)
    .filter(item => genre === "All" ? true : item.genre === genre)
    .sort((a, b) => {
      if (sortBy === sorts[0]) return a.title.localeCompare(b.title);
      if (sortBy === sorts[1]) return b.subs - a.subs;
      if (sortBy === sorts[2]) return b.growth - a.growth;
      return 0;
    });

  return (
    <article className="space-y-8 @container">
      <section className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="text-center md:text-left flex-1">
          <h1>Library</h1>
          <h4 className="mt-1">Manage and browse your <span className="font-bold">{filtered.length === data.length ? data.length : filtered.length + "/" + data.length}</span> tracked series</h4>
        </div>
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-2 bg-card px-3 py-2 shadow-sm rounded-full flex-1 md:flex-none md:w-64 border border-transparent focus-within:border-primary">
            <Search className="h-4 w-auto" />
            <input type="text" placeholder="Seach titles..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none placeholder:text-base text-emph" />
          </div>
          <details className="relative group">
            <summary className="flex items-center gap-2 px-4 py-2 bg-card font-medium text-emph rounded-full shadow-sm cursor-pointer border border-transparent group-open:border-primary"><Funnel className="h-4 w-auto" />Filter & Sort</summary>
            <div className="absolute right-0 top-12 bg-card p-4 shadow-md border border-slate-200 w-64 rounded-2xl space-y-4 text-sm text-emph z-1">
              <fieldset>
                <legend>Sort By</legend>
                {sorts.map((s, index) =>
                  <label key={index}>
                    <input type="radio" value={s} checked={sortBy === s} onChange={() => setSortBy(s)} />
                    {s}
                  </label>
                )}
              </fieldset>
              <fieldset>
                <legend>Status</legend>
                {statuses.map((s, index) =>
                  <label key={index}>
                    <input type="radio" value={s} checked={status === s} onChange={() => setStatus(s)} />
                    {s}
                  </label>
                )}
              </fieldset>
              <fieldset>
                <legend>Genres</legend>
                {genres.map((g, index) =>
                  <label key={index}>
                    <input type="radio" value={g} checked={genre === g} onChange={() => setGenre(g)} />
                    {g}
                  </label>
                )}
              </fieldset>
            </div>
          </details>
        </div>
      </section>
      <section className="grid grid-cols-1 @min-[525px]:grid-cols-2 @min-[775px]:grid-cols-3 @min-[1050px]:grid-cols-4 gap-6">
        {filtered.map((t, index) =>
          <Webtoon key={index} data={t} />
        )}
      </section>
    </article>
  );
}