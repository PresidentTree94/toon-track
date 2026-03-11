import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import { Search, Funnel } from "lucide-react";
import { FormElement } from "@presidenttree94/form-utils";

export default function Gallery<T extends Toon | Comp>({
  title, sub, data, filtered, searchFilters, otherFilters, itemComponent: ItemComponent
}:Readonly<{
  title: string;
  sub: string;
  data: T[];
  filtered: T[];
  searchFilters: { search: string; setSearch: (search: string) => void };
  otherFilters: Record<string, FormElement<string | string[]>> | undefined;
  itemComponent?: React.ComponentType<{data: T}>;
}>) {

  const { search, setSearch } = searchFilters;
  
  return (
    <article className="space-y-8 @container">
      <section className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="text-center md:text-left flex-1">
          <h1>{title}</h1>
          <h4 className="mt-1">Manage and browse your <span className="font-bold text-primary">{filtered.length === data.length ? data.length : filtered.length + "/" + data.length}</span> {sub} series</h4>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-card px-3 py-2 shadow-sm rounded-full flex-1 md:flex-none md:w-64 border border-transparent focus-within:border-primary">
            <Search className="h-4 w-auto" />
            <input type="text" placeholder="Search titles and protagonists..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none placeholder:text-base text-emph" />
          </div>
          <details className="relative group">
            <summary className="flex items-center gap-2 px-4 py-2 bg-card font-medium text-emph rounded-full shadow-sm cursor-pointer border border-transparent group-open:border-primary"><Funnel className="h-4 w-auto" /><span className="hidden sm:inline">Filter & Sort</span></summary>
            <div className="absolute right-0 top-12 bg-card p-4 shadow-md border border-slate-200 w-60 rounded-2xl space-y-4 text-sm text-emph z-1">
              {otherFilters && Object.entries(otherFilters).map(([key, f]) => (
                <fieldset key={key}>
                  <legend>{f.label}</legend>
                  <select multiple={f.multi} size={f.multi ? 3 : undefined} value={f.value} onChange={(e) => f.setValue(f.multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)} className="border p-1">
                    {f.options?.map((option) => {
                      const optionString = String(option);
                      return (<option key={optionString} value={optionString}>{optionString}</option>);
                    })}
                  </select>
                </fieldset>
              ))}
            </div>
          </details>
        </div>
      </section>
      <section className="grid grid-cols-1 @min-[33rem]:grid-cols-2 @min-[50rem]:grid-cols-3 @min-[67rem]:grid-cols-4 gap-6">
        {filtered.map(w =>
          ItemComponent && <ItemComponent key={w.id} data={w} />
        )}
      </section>
    </article>
  );
}