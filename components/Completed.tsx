"use client";
import { useState } from "react";
import { Comp } from "@/types/comp";
import Status from "./Status";
import { OWNER_ICONS } from "@/utils/constants";
import { useForm } from "@presidenttree94/form-utils";
import Modal from "./Modal";
import { updateCompletedById } from "@/lib/data/clientQueries";
import { Trope } from "@/types/trope";

export default function Completed({ data, tropesData }: { data: Comp; tropesData: Trope[]; }) {

  const { id, thumbnail, authors, title, genre, timestamp, protagonists, owner, reminder, tags } = data;
  const [open, setOpen] = useState(false);
  
  const { form, elements } = useForm({
    thumbnail: thumbnail,
    authors: authors,
    protagonists: protagonists,
    reminder: reminder,
    tags: tags
  }, {
    thumbnail: { label: "Thumbnail Link", type: "url" },
    authors: { label: "Author(s)" },
    protagonists: { label: "Protagonist(s)" },
    reminder: { label: "Reminder", options: ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    tags: { label: "Tags", options: tropesData.map(t => t._id), multi: true }
  });

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
      <div className="group bg-white border border-slate-200 hover:border-primary-five/40 rounded-2xl overflow-hidden transition-colors flex flex-col cursor-pointer" onClick={() => setOpen(true)}>
        <div className="relative aspect-2/3 overflow-hidden">
          <img src={thumbnail || `https://placehold.co/143x200?text=${title.replaceAll(" ", "+")}`} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-between gap-2">
            <Status status="Completed" className="self-end" />
            <h3 className="text-white font-bold text-2xl line-clamp-4">{title}</h3>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex gap-1.5 text-xs font-semibold">
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{genre === "Graphic Novel" ? "Graphic" : genre}</span>
            <span className="bg-primary-one text-primary-seven px-2 py-1 rounded-full flex items-center gap-1"><i className="ri-calendar-line"></i>{new Date(timestamp).toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" })}</span>
          </div>
          <p className="text-sm italic flex-1">{protagonists}</p>
          <span className="text-sm text-slate-600 flex items-center gap-1.5"><i className={OWNER_ICONS[owner]}></i>{owner}</span>
          <button className="mt-2 greenButton w-full">Edit</button>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Edit Completed"
        elements={elements}
        handleSubmit={handleSubmit}
        tropesData={tropesData}
      />
    </>
  );
}