import React from "react";
import { FormElement } from "@presidenttree94/form-utils";

export default function Modal({ open, setOpen, title, elements, handleSubmit, confirmDelete, setConfirmDelete, handleDelete }: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  elements: Record<string, FormElement<string | string[]>>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  confirmDelete?: number | null;
  setConfirmDelete?: (confirmDelete: number | null) => void;
  handleDelete?: () => void;
}) {
  return (
    <div className={`fixed inset-0 bg-black/50 z-3 ${open ? "flex" : "hidden"} justify-center items-center p-8`}>
      <div className="bg-white p-6 rounded-2xl max-w-md w-full">
        <h2 className="text-xl text-center">{title}</h2>
        <form className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 mt-6" onSubmit={handleSubmit}>
          {Object.entries(elements).map(([key, field]) => (
            <React.Fragment key={key}>
              <span className="text-sm font-medium">{field.label}</span>
              {field.options ?
                <select required={field.required} multiple={field.multi} size={1} value={field.value} onChange={(e) => field.setValue(field.multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)}>
                  {field.defaultOption && <option value="" disabled>{field.defaultOption}</option>}
                  {field.options?.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              : <input type={field.type ? field.type : "text"} required={field.required} value={field.value} onChange={(e) => field.setValue(e.target.value)} className="formInput outline-none" />}
            </React.Fragment>
          ))}
          <div className="grid grid-cols-2 col-span-full gap-4 mt-4">
            <button type="submit" className={`greenButton cursor-pointer ${handleDelete ? "col-span-full" : ""}`}>Submit</button>
            {handleDelete && <button type="button" className={`${confirmDelete ? "text-rose-600 bg-rose-500/25 border-rose-500" : "text-amber-600 bg-amber-500/25 border-amber-500"} border rounded-full text-sm font-bold px-4 py-2 cursor-pointer`} onClick={() => handleDelete()}>Delete</button>}
            <button type="button" className="border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-50 cursor-pointer" onClick={() => {setOpen(false); if (setConfirmDelete) setConfirmDelete(null);}}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}