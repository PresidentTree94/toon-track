"use client";
import { User, SwatchBook, BookOpen, Calendar, Users, TrendingUp, X, SquarePen } from "lucide-react";
import Graph from "@/components/Graph";
import { redirect, useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Toon } from "@/types/toon";
import { condenseValue, calcMedianGrowth, calcMedianGrowthTimeline } from "@/utils/calculations";
import { ICONS, STATUS_COLORS, STATUS_BADGE_COLORS } from "@/utils/constants";
import Modal from "@/components/Modal";

export default function Detail() {

  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const router = useRouter();

  const [thumbnail, setThumbnail] = useState("");
  const [authors, setAuthors] = useState("");
  const [protagonists, setProtagonists] = useState("");

  const [webtoon, setWebtoon] = useState<Toon>();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase .from("webtoons").select("*").ilike("title", `%${slug?.toString().split("-").join(" ")}%`).single();
      setWebtoon(data);
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase.from("webtoons").update({
      thumbnail: thumbnail ? thumbnail : null,
      authors: authors ? authors : webtoon?.authors,
      protagonists: protagonists ? protagonists : webtoon?.protagonists
    }).eq("id", webtoon?.id).select().single();
    setWebtoon(data ?? undefined);
    setThumbnail("");
    setAuthors("");
    setProtagonists("");
    setDeleteCheck(false);
    setOpen(false);
    router.refresh();
  }

  const updateOwner = async (owner: string) => {
    const { data } = await supabase.from("webtoons").update({ owner }).eq("id", webtoon?.id).select().single();
    setWebtoon(data ?? undefined);
    router.refresh();
  }

  const deleteWebtoon = async () => {
    if (!deleteCheck) {
      setDeleteCheck(true);
      return;
    }
    await supabase.from("webtoons").delete().eq("id", webtoon?.id);
    redirect("/library");
  }

  const mcs = webtoon?.protagonists ? webtoon.protagonists.split(", ") : [];

  return (
    <>
      <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <section className="space-y-6">
          <div className="overflow-hidden aspect-143/200 rounded-2xl">
            <img src={webtoon?.thumbnail ?? `https://placehold.co/143x200?text=${webtoon?.title.split(" ").join("+")}`} className="object-cover h-full w-full" />
          </div>
          <div className="bg-card p-6 shadow-sm rounded-2xl @container">
            <h2 className="text-center @2xs:text-left">{webtoon?.title}</h2>
            <div className="text-center @2xs:text-left"><i>{webtoon?.authors}</i></div>
            <div className="text-center @2xs:text-left space-y-4 @2xs:space-y-2 mt-4 @2xs:mt-2">
              <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
                <div className="flex items-center gap-2"><User className="h-4 w-auto" />MC(s)</div>
                <div className="@2xs:text-right">
                  {mcs?.map((p, index) =>
                    <span key={index} className="font-semibold block">{p}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
                <div className="flex items-center gap-2"><SwatchBook className="h-4 w-auto" />Genre</div>
                <span className="font-semibold">{webtoon?.genre}</span>
              </div>
              <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
                <div className="flex items-center gap-2"><BookOpen className="h-4 w-auto" />Status</div>
                <span className={`font-semibold ${webtoon && STATUS_COLORS[webtoon.status]}`}>{webtoon?.status}</span>
              </div>
              <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-auto" />Update</div>
                <span className="font-semibold">{webtoon?.days}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 @2xs:mt-4">
                {Object.keys(ICONS).map(key => {
                  const Icon = ICONS[key];
                  return (
                    <button key={key} className={`rounded-2xl  py-2 flex items-center justify-center cursor-pointer ${webtoon?.owner === key ? "bg-primary text-white shadow-lg shadow-primary/20" : "border text-emph hover:bg-slate-100"}`} onClick={() => updateOwner(key)}><Icon className="h-4.5 w-auto" /></button>
                  )
                })}
                <button className="rounded-2xl  py-2 flex items-center justify-center border text-emph hover:bg-slate-100 cursor-pointer" onClick={() => { setOpen(true); setDeleteCheck(false); }}><SquarePen className="h-4.5 w-auto" /></button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 @container">
          <div className="grid grid-cols-1 @md:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="card flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-500" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Latest Subs</p>
                <h2>{webtoon && webtoon.data.length > 0 ? condenseValue(webtoon.data[webtoon.data.length - 1].value) : 0}</h2>
              </div>
            </div>
            <div className="card flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center"><TrendingUp className="text-green-500" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Latest Growth</p>
                <h2>{webtoon && webtoon.data.length > 1 ? calcMedianGrowth(webtoon.data[webtoon.data.length - 2].value, webtoon.data[webtoon.data.length - 1].value) + "%": 0}</h2>
              </div>
            </div>
          </div>
          <div className="h-75 flex-none md:h-auto md:flex-1 flex flex-col">
            <h3 className="mb-4">Subscribers</h3>
            {webtoon && webtoon.data.length > 1 ? <Graph data={webtoon.data} /> : <div className="border border-dashed h-full rounded-2xl flex items-center justify-center"><p>Not enough data to generate graph.</p></div>}
          </div>
          <div className="h-75 flex-none md:h-auto md:flex-1 flex flex-col">
            <h3 className="mb-4">Percent Growth</h3>
            {webtoon && webtoon.data.length > 2 ? <Graph data={calcMedianGrowthTimeline([webtoon])} /> : <div className="border border-dashed h-full rounded-2xl flex items-center justify-center"><p>Not enough data to generate graph.</p></div>}
          </div>
        </section>
      </article>
      <Modal heading="Edit Webtoon Details" open={open} setOpen={setOpen} handleSubmit={handleSubmit}>
        <label>Thumbnail Link:</label>
        <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        <label>Author(s):</label>
        <input type="text" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={authors} onChange={(e) => setAuthors(e.target.value)} />
        <label>Protagonist(s):</label>
        <input type="text" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={protagonists} onChange={(e) => setProtagonists(e.target.value)} />
        <button type="button" className={`col-span-full border text-emph rounded-2xl py-2 flex items-center justify-center cursor-pointer ${deleteCheck ? `${STATUS_COLORS["Hiatus"]} ${STATUS_BADGE_COLORS["Hiatus"]}` : "hover:bg-slate-100"}`} onClick={deleteWebtoon}><X className="h-4.5 w-auto" /></button>
      </Modal>
    </>
  );
}