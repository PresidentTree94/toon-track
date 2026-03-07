import React from "react";
import { BoundField } from "@presidenttree94/form-utils";

export default function FormField<T>({ field }: { field: BoundField<T, any> }) {
  const className = "border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary";
  return (
    <React.Fragment>
      <label>{field.label}:</label>
      {field.options ?
        <select className={`${className} appearance-none`} value={String(field.value)} onChange={(e) => field.setValue(e.target.value)} required={field.required}>
          {field.options.map(option => {
            const optionValue = String(option);
            return (<option key={optionValue} value={optionValue}>{optionValue}</option>);
          })}
        </select>
      : <input type={field.type || "text"} className={className} value={String(field.value)} onChange={(e) => field.setValue(e.target.value)} required={field.required} />}
    </React.Fragment>
  );
}