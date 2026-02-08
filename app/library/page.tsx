"use client";
import Webtoon from "@/components/Webtoon";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Toon } from "@/types/toon";
import Gallery from "@/components/Gallery";

function calcMedianGrowth(pastSubscribers: number, latestSubscribers: number) {
  return ((latestSubscribers - pastSubscribers) / pastSubscribers) * 100;
}

export default function Library() {

  const [webtoons, setWebtoons] = useState<Toon[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("webtoons").select("*").neq("status", "Completed");
      setWebtoons(data ?? []);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [owner, setOwner] = useState("All");
  const [status, setStatus] = useState("All");
  const [genre, setGenre] = useState("All");

  const preFiltered = webtoons
  .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
  .filter(item => owner === "All" ? true : item.owner === owner)
  .filter(item => status === "All" ? true : item.status === status);

  const sorts = ["Title", "Subscribers", "Growth"];
  const owners = ["All", "Karly", "Rachelle", "Shared"];
  const statuses = ["All", "Ongoing", "Hiatus"];
  const genres = ["All", ...[...new Set(preFiltered.map(item => item.genre))].sort()];

  const filtered = preFiltered
    .filter(item => genre === "All" ? true : item.genre === genre)
    .sort((a, b) => {
      const aSubs = a.data[a.data.length - 1] ? a.data[a.data.length - 1].value : 0;
      const bSubs = b.data[b.data.length - 1] ? b.data[b.data.length - 1].value : 0;
      const aGrowth = a.data[a.data.length - 2] ? calcMedianGrowth(a.data[a.data.length - 2].value, aSubs) : -Infinity;
      const bGrowth = b.data[b.data.length - 2] ? calcMedianGrowth(b.data[b.data.length - 2].value, bSubs) : -Infinity;
      if (sortBy === sorts[0]) return a.title.localeCompare(b.title);
      if (sortBy === sorts[1]) return bSubs - aSubs;
      if (sortBy === sorts[2]) return bGrowth - aGrowth;
      return 0;
    });

  const filters = {
    sortBy: {
      label: "Sort By",
      value: sortBy,
      setValue: setSortBy,
      options: sorts
    },
    owner: {
      label: "Owner",
      value: owner,
      setValue: setOwner,
      options: owners
    },
    status: {
      label: "Status",
      value: status,
      setValue: setStatus,
      options: statuses
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
      title="Library"
      sub="active"
      data={webtoons}
      filtered={filtered}
      searchFilters={{ search, setSearch }}
      otherFilters={filters}
      itemComponent={Webtoon}
    />
  );
}