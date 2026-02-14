"use client";
import { useState } from "react";
import { Comp } from "@/types/comp";
import { ICONS } from "@/utils/constants";
import Modal from "./Modal";
import { supabase } from "@/lib/supabaseClient";

export default function Completed({ data }:Readonly<{ data: Comp; }>) {

  const temp = data.title.split(" ").join("+");
  const Icon = ICONS[data.owner];
  const [open, setOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(data.thumbnail);
  const [authors, setAuthors] = useState(data.authors);
  const [protagonists, setProtagonists] = useState(data.protagonists);
  const [reminder, setReminder] = useState<string>(data.reminder);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: completed } = await supabase.from("completed").update({
      thumbnail: thumbnail.trim() || data.thumbnail,
      authors: authors.trim() || data.authors,
      protagonists: protagonists.trim() || data.protagonists,
      reminder: reminder
    }).eq("id", data.id).select().single();
    setThumbnail(completed?.thumbnail);
    setAuthors(completed?.authors);
    setProtagonists(completed?.protagonists);
    setReminder(completed?.reminder);
    setOpen(false);
  }

  return (
    <>
      <div className="bg-card shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col" onClick={() => setOpen(true)}>
        <div className="relative overflow-hidden aspect-143/200">
          <img src={data.thumbnail ?? `https://placehold.co/143x200?text=${temp}`} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
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
        <label>Thumbnail Link:</label>
        <input type="url" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        <label>Author(s):</label>
        <input type="text" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={authors} onChange={(e) => setAuthors(e.target.value)} />
        <label>Protagonist(s):</label>
        <input type="text" className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary" value={protagonists} onChange={(e) => setProtagonists(e.target.value)} />
        <label>Reminder:</label>
        <select className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary appearance-none" value={reminder} onChange={(e) => setReminder(e.target.value)}>
          <option value=""></option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </Modal>
    </>
  );
}