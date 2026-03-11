"use client";
import { useEffect, useState } from "react";
import { Comp } from "@/types/comp";
import Gallery from "@/components/Gallery";
import Completed from "@/components/Completed";
import { getCompleted } from "@/lib/data/completedQueries";
import { useFormState, buildFormElements } from "@presidenttree94/form-utils";

export default function Archive() {

  const [webtoons, setWebtoons] = useState<Comp[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const completedData = await getCompleted();
      setWebtoons(completedData);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const archiveForm = useFormState({
    sortBy: "Timestamp",
    owner: [] as string[],
    genre: "All"
  });

  const preFiltered = webtoons
  .filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.protagonists.toLowerCase().includes(search.toLowerCase()))
  .filter(item => archiveForm.form.owner.length === 0 || archiveForm.form.owner.includes(item.owner));

  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => archiveForm.form.genre === "All" ? true : item.genre === archiveForm.form.genre)
    .sort((a, b) => { 
      if (archiveForm.form.sortBy === "Title") return a.title.localeCompare(b.title);
      if (archiveForm.form.sortBy === "Timestamp") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      return 0;
  });

  const archiveFilters = buildFormElements(archiveForm.form, archiveForm.update, {
    sortBy: { label: "Sort By", options: ["Timestamp", "Title"] },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    genre: { label: "Genre", options: genres }
  });

  return (
    <Gallery
      title="Archive"
      sub="completed"
      data={webtoons} 
      filtered={filtered} 
      searchFilters={{ search, setSearch }}
      otherFilters={archiveFilters}
      itemComponent={Completed}
    />
  );
}