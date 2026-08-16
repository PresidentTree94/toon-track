"use client";
import { useState } from "react";
import { Comp } from "@/types/comp";
import Gallery from "@/components/Gallery";
import Completed from "@/components/Completed";
import { useFormState, buildFormElements } from "@presidenttree94/form-utils";
import { WEBTOON_TAG_MARKERS } from "@/utils/constants";

export default function Archive({ completedData }: { completedData: Comp[] }) {

  const [search, setSearch] = useState("");
  const { form, update } = useFormState({
    sortBy: "Timestamp",
    owner: [] as string[],
    genre: "All",
    tags: [] as string[]
  });

  const preFiltered = completedData
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.protagonists.toLowerCase().includes(search.toLowerCase()) ||
    item.authors.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => form.owner.length === 0 || form.owner.includes(item.owner))
  .filter(item => form.tags.length === 0 || form.tags.every(tag => item.tags.includes(tag)));

  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => form.genre === "All" ? true : item.genre === form.genre)
    .sort((a, b) => { 
      if (form.sortBy === "Title") return a.title.localeCompare(b.title);
      if (form.sortBy === "Timestamp") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      return 0;
  });

  const archiveFilters = buildFormElements(form, update, {
    sortBy: { label: "Sort By", options: ["Timestamp", "Title"] },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    genre: { label: "Genre", options: genres },
    tags: { label: "Tags", options: Object.keys(WEBTOON_TAG_MARKERS), multi: true }
  });

  return (
    <Gallery
      title="Archive"
      sub="completed"
      data={completedData} 
      filtered={filtered} 
      searchFilters={{ search, setSearch }}
      otherFilters={archiveFilters}
      itemComponent={Completed}
    />
  );
}