import React from "react";
import { FormElement } from "@presidenttree94/form-utils";

export default function FormField<Value>({ field }: { field: FormElement<Value> }) {
  const className = "border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary";
  return (
    <React.Fragment>
      <label>{field.label}:</label>
      {field.options ?
        <select className={`${className} appearance-none`} value={String(field.value)} onChange={(e) => field.setValue(e.target.value)} required={field.required}>
          {field.defaultOption && <option value={undefined}>{field.defaultOption}</option>}
          {field.options.map(option => {
            const optionString = String(option);
            return (<option key={optionString} value={optionString}>{optionString}</option>);
          })}
        </select>
      : <input type={field.type || "text"} className={className} value={String(field.value)} onChange={(e) => field.setValue(e.target.value)} required={field.required} />}
    </React.Fragment>
  );
}