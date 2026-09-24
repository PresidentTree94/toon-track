import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import { Trope } from "@/types/trope";
import { FormElement } from "@presidenttree94/form-utils";

export default function Gallery<T extends Toon | Comp>({ title, subtitle, totalData, filteredData, filters, tropesData, children }: {
  title: string;
  subtitle: string;
  totalData: T[];
  filteredData: T[];
  filters: { 
    search: string;
    setSearch: (search: string) => void;
    elements: Record<string, FormElement<string | string[]>>;
  };
  tropesData: Trope[];
  children: React.ReactNode;
}) {

  const { search, setSearch, elements } = filters;

  return (
    <main>
      <section className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left gap-8">
        <div>
          <h1 className="text-4xl">{title}</h1>
          <p className="mt-1 text-slate-500">Manage and browse your <span className="font-bold text-primary-five">{filteredData.length === totalData.length ? totalData.length : filteredData.length + "/" + totalData.length}</span> {subtitle} series</p>
        </div>
        <div className="flex items-center gap-4 max-w-md w-full">
          <div className="bg-white border border-slate-200 focus-within:border-primary-five/40 rounded-full text-sm flex items-center gap-2 py-2 px-3 flex-1">
            <i className="ri-search-line"></i>
            <input type="text" placeholder="Search..." className="outline-none flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <details className="relative group text-left">
            <summary className="bg-white border border-slate-200 text-slate-600 hover:border-primary-five/40 group-open:border-primary-five/40 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 cursor-pointer"><i className="ri-filter-line"></i>Filter</summary>
            <div className="absolute top-11.5 right-0 bg-white border border-slate-200 p-4 rounded-xl z-1 min-w-60 space-y-2">
              {Object.entries(elements).map(([key, field]) => (
                <fieldset key={key} className="space-y-1">
                  <legend className="text-sm font-semibold">{field.label}</legend>
                  <select multiple={field.multi} size={1} value={field.value} onChange={(e) => field.setValue(field.multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)}>
                    {field.options?.map(o => (
                      <option key={o} value={o}>{field.label === "Tags" ? tropesData.find(t => t._id === o)?.title : o}</option>
                    ))}
                  </select>
                </fieldset>
              ))}
            </div>
          </details>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </section>
    </main>
  );
}