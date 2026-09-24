"use client";
import { useState } from "react";
import { Comp } from "@/types/comp";
import Gallery from "@/components/Gallery";
import { useForm } from "@presidenttree94/form-utils";
import Completed from "@/components/Completed";

export default function ArchiveClient({ completedData }: { completedData: Comp[] }) {

  const [search, setSearch] = useState("");
  const { form, elements } = useForm({
    owner: [] as string[],
    genre: "All",
  }, {
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
    genre: { label: "Genre", options: ["All", ...[...new Set(completedData.map(item => item.genre))].sort()] },
  });

  const filteredData = completedData
  .filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.protagonists.toLowerCase().includes(search.toLowerCase())
  )
  .filter(item => form.owner.length === 0 || form.owner.includes(item.owner))
  .filter(item => form.genre === "All" ? true : item.genre === form.genre);

  return (
    <Gallery title="Archive" subtitle="completed" totalData={completedData} filteredData={filteredData} filters={{ search, setSearch, elements }}>
      {filteredData.map(c => (
        <Completed key={c.id} data={c} />
      ))}
    </Gallery>
  );
}