"use client";
import Webtoon from "@/components/Webtoon";
import { useEffect, useState } from "react";
import { Toon } from "@/types/toon";
import Gallery from "@/components/Gallery";
import { calcMedianGrowth } from "@/utils/calculations";
import { getWebtoons } from "@/lib/data/webtoonQueries";
import { useFormState, buildFormElements } from "@presidenttree94/form-utils";

export default function Library() {

  const [webtoons, setWebtoons] = useState<Toon[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const webtoonData = await getWebtoons();
      setWebtoons(webtoonData);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const libraryForm = useFormState({
    sortBy: "Title",
    owner: [] as string[],
    status: "All",
    genre: "All",
    day: "All"
  });

  const preFiltered = webtoons
  .filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.protagonists.toLowerCase().includes(search.toLowerCase()))
  .filter(item => libraryForm.form.owner.length === 0 || libraryForm.form.owner.includes(item.owner))
  .filter(item => libraryForm.form.status === "All" ? true : item.status === libraryForm.form.status)
  .filter(item => libraryForm.form.day === "All" ? true : item.days.includes(libraryForm.form.day));

  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => libraryForm.form.genre === "All" ? true : item.genre === libraryForm.form.genre)
    .sort((a, b) => {
      const aSubs = a.data[a.data.length - 1] ? a.data[a.data.length - 1].value : 0;
      const bSubs = b.data[b.data.length - 1] ? b.data[b.data.length - 1].value : 0;
      const aGrowth = a.data[a.data.length - 2] ? calcMedianGrowth(a.data[a.data.length - 2].value, aSubs) : -Infinity;
      const bGrowth = b.data[b.data.length - 2] ? calcMedianGrowth(b.data[b.data.length - 2].value, bSubs) : -Infinity;
      if (libraryForm.form.sortBy === "Title") return a.title.localeCompare(b.title);
      if (libraryForm.form.sortBy === "Subscribers") return bSubs - aSubs;
      if (libraryForm.form.sortBy === "Growth") return bGrowth - aGrowth;
      return 0;
  });

  const libraryFilters = buildFormElements(libraryForm.form, libraryForm.update, {
    sortBy: { label: "Sort By", options: ["Title", "Subscribers", "Growth"] },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    status: { label: "Status", options: ["All", "Ongoing", "Hiatus"] },
    genre: { label: "Genre", options: genres },
    day: { label: "Day", options: ["All", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }
  });

  return (
    <Gallery
      title="Library"
      sub="active"
      data={webtoons}
      filtered={filtered}
      searchFilters={{ search, setSearch }}
      otherFilters={libraryFilters}
      itemComponent={Webtoon}
    />
  );
}