"use client";
import Webtoon from "@/components/Webtoon";
import { useState } from "react";
import { Toon } from "@/types/toon";
import Gallery from "@/components/Gallery";
import { calcMedianGrowth } from "@/utils/calculations";
import { useFormState, buildFormElements } from "@presidenttree94/form-utils";
import { WEBTOON_TAG_MARKERS } from "@/utils/constants";

export default function Library({ webtoonsData }: { webtoonsData: Toon[] }) {

  const [search, setSearch] = useState("");
  const { form, update } = useFormState({
    sortBy: "Title",
    owner: [] as string[],
    status: "All",
    genre: "All",
    day: "All",
    tags: [] as string[]
  });

  const preFiltered = webtoonsData
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.protagonists.toLowerCase().includes(search.toLowerCase()) ||
    item.authors.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => form.owner.length === 0 || form.owner.includes(item.owner))
  .filter(item => form.status === "All" ? true : item.status === form.status)
  .filter(item => form.day === "All" ? true : item.days.includes(form.day))
  .filter(item => form.tags.length === 0 || form.tags.every(tag => item.tags.includes(tag)));

  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => form.genre === "All" ? true : item.genre === form.genre)
    .sort((a, b) => {
      const aSubs = a.data[a.data.length - 1] ? a.data[a.data.length - 1].value : 0;
      const bSubs = b.data[b.data.length - 1] ? b.data[b.data.length - 1].value : 0;
      const aGrowth = a.data[a.data.length - 2] ? calcMedianGrowth(a.data[a.data.length - 2].value, aSubs) : -Infinity;
      const bGrowth = b.data[b.data.length - 2] ? calcMedianGrowth(b.data[b.data.length - 2].value, bSubs) : -Infinity;
      if (form.sortBy === "Title") return a.title.localeCompare(b.title);
      if (form.sortBy === "Subscribers") return bSubs - aSubs;
      if (form.sortBy === "Growth") return bGrowth - aGrowth;
      return 0;
  });

  const libraryFilters = buildFormElements(form, update, {
    sortBy: { label: "Sort By", options: ["Title", "Subscribers", "Growth"] },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    status: { label: "Status", options: ["All", "Ongoing", "Hiatus"] },
    genre: { label: "Genre", options: genres },
    day: { label: "Day", options: ["All", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    tags: { label: "Tags", options: Object.keys(WEBTOON_TAG_MARKERS), multi: true }
  });

  return (
    <Gallery
      title="Library"
      sub="active"
      data={webtoonsData}
      filtered={filtered}
      searchFilters={{ search, setSearch }}
      otherFilters={libraryFilters}
      itemComponent={Webtoon}
    />
  );
}