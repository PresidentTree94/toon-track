import React from "react";
import { FormElement } from "@presidenttree94/form-utils";

export default function FormField({ field }: { field: FormElement<string | string[]> }) {
  const className = "border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary";
  return (
    <React.Fragment>
      <label>{field.label}:</label>
      {field.options ?
        <select {...(field.multi ? {multiple: true, size: 3} : {})} className={`${className} ${field.multi ? "rounded-xl" : ""} appearance-none`} value={field.value} onChange={(e) => field.setValue(field.multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)} required={field.required}>
          {field.defaultOption && <option value={undefined}>{field.defaultOption}</option>}
          {field.options.map(option => {
            return (<option key={option} value={option}>{option}</option>);
          })}
        </select>
      : <input type="text" className={className} value={field.value} onChange={(e) => field.setValue(e.target.value)} required={field.required} />}
    </React.Fragment>
  );
}