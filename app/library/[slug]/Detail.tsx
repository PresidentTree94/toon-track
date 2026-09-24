"use client";
import { useState } from "react";
import { Toon } from "@/types/toon";
import { calcMedianGrowth, condenseValue } from "@/utils/calculations";
import Status from "@/components/Status";
import { OWNER_ICONS } from "@/utils/constants";
import { useForm } from "@presidenttree94/form-utils";
import Modal from "@/components/Modal";
import { updateWebtoonById, deleteWebtoonById } from "@/lib/data/clientQueries";
import { redirect } from "next/navigation";

export default function DetailClient({ webtoonsData, slug }: { webtoonsData: Toon[]; slug: number; }) {

  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
  const webtoon = webtoonsData.find(item => item.id === slug);
  if (!webtoon) return;
  const { id, title, owner, thumbnail, genre, status, tags, authors, protagonists, days, data, manual_updates, status_time, owner_time } = webtoon;
  
  const sortedWebtoons = webtoonsData.filter(item => item.initial).sort((a, b) => (b.data.at(-1)?.value ?? 0) - (a.data.at(-1)?.value ?? 0));
  const rank = sortedWebtoons.findIndex(s => s.id === Number(slug)) + 1;
  const latestSubs = data.length > 0 ? data.at(-1)!.value : -1;
  const latestGrowth = data.length > 1 ? calcMedianGrowth(data.at(-2)!.value, latestSubs) : -1;
  const cards = [
    { text: "Rank", value: "#" + rank, icon: "ri-trophy-line" },
    { text: "Subscribers", value: data.length > 0 ? condenseValue(latestSubs) : "—", icon: "ri-user-heart-line" },
    { text: "Growth", value: data.length > 1 ? condenseValue(latestGrowth) + "%" : "—", icon: "ri-line-chart-line" },
    { text: "Day(s)", value: days, icon: "ri-calendar-line" }
  ];

  const { form, elements } = useForm({
    thumbnail: thumbnail,
    authors: authors,
    protagonists: protagonists,
    owner: owner,
    status: status,
    manualUpdates: manual_updates ? "TRUE": "FALSE",
  }, {
    thumbnail: { label: "Thumbnail Link", type: "url" },
    authors: { label: "Author(s)" },
    protagonists: { label: "Protagonist(s)" },
    owner: { label: "Owner", options: ["Karly", "Rachelle", "Shared"] },
    status: { label: "Status", options: ["Ongoing", "Hiatus"] },
    manualUpdates: { label: "Manual", options: ["TRUE", "FALSE"] },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateWebtoonById(id, {
      thumbnail: form.thumbnail.trim(),
      authors: form.authors.trim(),
      protagonists: form.protagonists.trim(),
      owner: form.owner,
      owner_time: form.owner !== owner ? new Date().toISOString() : owner_time,
      status: form.status,
      manual_updates: form.manualUpdates === "TRUE" ? true : false,
      status_time: (form.manualUpdates === "TRUE" && !manual_updates) || (form.manualUpdates === "FALSE" && manual_updates) ? null : status_time,
    });
    setOpen(false);
  }

  const handleDelete = async () => {
    if (confirmDelete) {
      await deleteWebtoonById(confirmDelete);
      setConfirmDelete(null);
      redirect("/library");
    } else {
      setConfirmDelete(id);
    }
  }

  return (
    <>
      <main>
        <section className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 relative">
          <img src={thumbnail || `https://placehold.co/143x200?text=${title.replaceAll(" ", "+")}`} className="aspect-2/3 object-cover rounded-3xl w-full md:sticky top-24" />
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-2">
              <div className="flex gap-2">
                <Status status={genre} />
                <Status status={status} />
              </div>
              <button className="text-rose-600 bg-rose-500/10 border border-rose-600 w-8 h-8 rounded-full flex items-center justify-center hover:text-rose-700 hover:bg-rose-400 cursor-pointer" onClick={() => setOpen(true)}><i className="ri-pencil-line"></i></button>
            </div>
            <h1 className="text-4xl">{title}</h1>
            <p className="flex items-center gap-1.5"><i className={`${OWNER_ICONS[owner]} text-lg`}></i><span>Tracked by <span className="font-semibold">{owner}</span></span></p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((c, index) => (
                <div key={index} className="bg-white border border-slate-200 hover:border-primary-five/40 rounded-2xl p-4 space-y-1 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <i className={`${c.icon} text-primary-five`}></i>
                    <span className="text-xs font-medium text-slate-500">{c.text}</span>
                  </div>
                  <h3 className="text-xl font-extrabold">{c.value}</h3>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h2 className="text-sm uppercase text-slate-500">Tags & Tropes</h2>
              <div className="flex gap-2 text-xs font-semibold mt-2">
                {tags.sort().map((t, index) => (
                  <span key={index} className="bg-slate-100 text-slate-600 rounded-full px-3 py-1.5">{t}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-2">
                <div className="bg-primary-five/10 text-primary-five w-9 h-9 rounded-xl flex items-center justify-center">
                  <i className="ri-quill-pen-line"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Authors</p>
                  <p className="font-bold">{authors}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-2">
                <div className="bg-amber-500/10 text-amber-600 w-9 h-9 rounded-xl flex items-center justify-center">
                  <i className="ri-user-star-line"></i>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Protagonists</p>
                  <p className="font-bold">{protagonists}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>Graphs</section>
      </main>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Edit Webtoon"
        elements={elements}
        handleSubmit={handleSubmit}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        handleDelete={handleDelete}
      />
    </>
  );
}