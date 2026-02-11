"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Toon } from "@/types/toon";
import Gallery from "@/components/Gallery";
import Completed from "@/components/Completed";

export default function Archive() {

  const [webtoons, setWebtoons] = useState<Toon[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("completed").select("*");
      setWebtoons(data ?? []);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [owner, setOwner] = useState("All");
  const [genre, setGenre] = useState("All");

  const preFiltered = webtoons
  .filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.protagonists.toLowerCase().includes(search.toLowerCase()))
  .filter(item => owner === "All" ? true : item.owner === owner)

  const owners = ["All", "Karly", "Rachelle", "Shared"];
  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => genre === "All" ? true : item.genre === genre)
    .sort((a, b) => { return a.title.localeCompare(b.title); });

  const filters = {
    owner: {
      label: "Owner",
      value: owner,
      setValue: setOwner,
      options: owners
    },
    genre: {
      label: "Genre",
      value: genre,
      setValue: setGenre,
      options: genres
    }
  };

  return (
    <Gallery
      title="Archive"
      sub="completed"
      data={webtoons} 
      filtered={filtered} 
      searchFilters={{ search, setSearch }}
      otherFilters={filters}
      itemComponent={Completed}
    />
  );
}