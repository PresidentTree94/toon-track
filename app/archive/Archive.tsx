"use client";
import { Comp } from "@/types/comp";
import { Trope } from "@/types/trope";
import Gallery from "@/components/Gallery";
import Completed from "@/components/Completed";
import { useSearchParams } from "next/navigation";
import { useGalleryFilters } from "@/hooks/useGalleryFilters";

export default function ArchiveClient({ completedData, tropesData }: { completedData: Comp[]; tropesData: Trope[]; }) {

  const searchParams = useSearchParams();
  const { search, setSearch, elements, filteredData } = useGalleryFilters({
    data: completedData,
    searchParams,
    initialForm: {
      owner: searchParams.get("owner")?.split(",") ?? [],
      genre: searchParams.get("genre") ?? "All",
      tags: searchParams.get("tags")?.split(",") ?? []
    },
    formConfig: {
      owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"], multi: true },
      genre: { label: "Genre", options: ["All", ...[...new Set(completedData.map(item => item.genre))].sort()] },
      tags: { label: "Tags", options: tropesData.map(t => t._id), multi: true }
    },
    filterFn: (item, form, search) => 
      (item.title.toLowerCase().includes(search.toLowerCase()) || item.protagonists.toLowerCase().includes(search.toLowerCase())) &&
      (form.owner.length === 0 || form.owner.includes(item.owner)) &&
      (form.genre === "All" ? true : item.genre === form.genre) &&
      (form.tags.length === 0 || form.tags.every(((tag: string) => item.tags.includes(tag))))
  });

  return (
    <Gallery
      title="Archive"
      subtitle="completed"
      totalData={completedData}
      filteredData={filteredData}
      filters={{ search, setSearch, elements }}
      searchParams={searchParams}
      tropesData={tropesData}
    >
      {filteredData.map(c => ( <Completed key={c.id} data={c} tropesData={tropesData} /> ))}
    </Gallery>
  );
}