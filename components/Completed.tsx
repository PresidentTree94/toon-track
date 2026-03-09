"use client";
import React, { useState } from "react";
import { Comp } from "@/types/comp";
import { ICONS } from "@/utils/constants";
import Modal from "./Modal";
import FormField from "./FormField";
import { useForm } from "@presidenttree94/form-utils";
import { updateCompletedById } from "@/lib/data/completedQueries";

export default function Completed({ data }:Readonly<{ data: Comp; }>) {

  const Icon = ICONS[data.owner];
  const [open, setOpen] = useState(false);
  const completedForm = useForm(
    {
      thumbnail: data.thumbnail,
      authors: data.authors,
      protagonists: data.protagonists,
      reminder: data.reminder
    },
    {
      thumbnail: { label: "Thumbnail Link", type: "url" },
      authors: { label: "Author(s)" },
      protagonists: { label: "Protagonist(s)" },
      reminder: { label: "Reminder", options: ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
    }
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCompletedById(data.id, {
      thumbnail: completedForm.form.thumbnail.trim() || data.thumbnail,
      authors: completedForm.form.authors.trim() || data.authors,
      protagonists: completedForm.form.protagonists.trim() || data.protagonists,
      reminder: completedForm.form.reminder
    });
    setOpen(false);
  }

  return (
    <>
      <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col" onClick={() => setOpen(true)}>
        <div className="relative overflow-hidden aspect-143/200">
          <img src={data.thumbnail ?? `https://placehold.co/143x200?text=${data.id}`} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent p-4 flex flex-col justify-end items-start gap-2">
            <span className="text-primary bg-primary/20 text-xs font-semibold uppercase px-2.5 py-0.5 backdrop-blur-md tracking-wider rounded-full border-primary/25">{data.genre}</span>
            <h2 className="text-white">{data.title}</h2>
          </div>
        </div>
        <div className="p-4 text-sm flex flex-col justify-between flex-1 gap-3">
          <div className="space-y-3">
            <div><i>{data.authors}</i></div>
            <div className="font-semibold">{data.protagonists}</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 border border-slate-200 p-2 rounded-xl"><Icon className="h-4 w-auto text-primary" />{data.owner}</div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold w-full">Edit</button>
          </div>
        </div>
      </div>
      <Modal heading="Completed Details" open={open} setOpen={setOpen} handleSubmit={handleSubmit}>
        {Object.entries(completedForm.elements).map(([key, field]) => (
          <FormField key={key} field={field} />
        ))}
      </Modal>
    </>
  );
}