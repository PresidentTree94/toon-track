"use client";
import React, { useState } from "react";
import { Comp } from "@/types/comp";
import { ICONS, WEBTOON_TAG_MARKERS } from "@/utils/constants";
import Modal from "./Modal";
import FormField from "./FormField";
import { useForm } from "@presidenttree94/form-utils";
import { updateCompletedById } from "@/lib/data/completedBrowserQueries";
import Image from "next/image";

export default function Completed({ data }: Readonly<{ data: Comp; }>) {

  const { owner, thumbnail, authors, protagonists, reminder, tags, id, title, genre } = data;
  const Icon = ICONS[owner];
  const [open, setOpen] = useState(false);
  const { form, elements } = useForm(
    {
      thumbnail: thumbnail,
      authors: authors,
      protagonists: protagonists,
      reminder: reminder,
      tags: tags
    },
    {
      thumbnail: { label: "Thumbnail Link", type: "url" },
      authors: { label: "Author(s)" },
      protagonists: { label: "Protagonist(s)" },
      reminder: { label: "Reminder", options: ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
      tags: { label: "Tags", options: Object.keys(WEBTOON_TAG_MARKERS), multi: true }
    }
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCompletedById(id, {
      thumbnail: form.thumbnail.trim(),
      authors: form.authors.trim(),
      protagonists: form.protagonists.trim(),
      reminder: form.reminder,
      tags: form.tags
    });
    setOpen(false);
  }

  return (
    <>
      <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col" onClick={() => setOpen(true)}>
        <div className="relative overflow-hidden aspect-143/200">
          <Image src={thumbnail || `https://placehold.co/143x200?text=${id}`} alt={title} fill sizes="100%" className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
            <div className="self-end flex gap-2 text-primary">
              {tags.map(t => {
                const Icon = WEBTOON_TAG_MARKERS[t];
                return Icon ? <Icon key={t} className="h-6" /> : null;
              })}
            </div>
            <div className="space-y-2">
              <span className="text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{genre}</span>
              <h2 className="text-white">{title}</h2>
            </div>
          </div>
        </div>
        <div className="p-4 text-sm flex flex-col justify-between flex-1 gap-3">
          <div className="space-y-3">
            <div><i>{authors}</i></div>
            <div className="font-semibold">{protagonists}</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 border border-slate-200 p-2 rounded-xl"><Icon className="h-4 w-auto text-primary" />{owner}</div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold w-full">Edit</button>
          </div>
        </div>
      </div>
      <Modal heading="Completed Details" open={open} setOpen={setOpen} handleSubmit={handleSubmit}>
        {Object.entries(elements).map(([key, field]) => (
          <FormField key={key} field={field} />
        ))}
      </Modal>
    </>
  );
}