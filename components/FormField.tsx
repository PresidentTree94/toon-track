import React from "react";
import { FormElement } from "@presidenttree94/form-utils";

export default function FormField({ field }: { field: FormElement<string | string[]> }) {

  const { label, options, multi, value, setValue, required, defaultOption } = field
  const className = "border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary";
  
  return (
    <React.Fragment>
      <label>{label}:</label>
      {options ?
        <select {...(multi ? {multiple: true, size: 3} : {})} className={`${className} ${multi ? "rounded-xl" : ""} appearance-none`} value={value} onChange={(e) => setValue(multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)} required={required}>
          {defaultOption && <option value={undefined}>{defaultOption}</option>}
          {options.map(option => {
            return (<option key={option} value={option}>{option}</option>);
          })}
        </select>
      : <input type="text" className={className} value={value} onChange={(e) => setValue(e.target.value)} required={required} />}
    </React.Fragment>
  );
}