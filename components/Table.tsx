type Column = {
  label: string;
  align?: "left" | "right";
  width?: string;
  sortable?: boolean;
}

type SortKey = "series" | "subs" | "growth";

export default function Table({ columns, rows, sortKey, setSortKey }: {
  columns: Column[]; rows: React.ReactNode; sortKey: SortKey; setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
}) {
  return (
    <div className="w-full overflow-auto rounded-2xl mt-4 border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
          <tr>
            {columns.map(c => {
              const key = c.label.toLowerCase();
              return (
                <th
                  key={key}
                  className={`
                    ${c.align === "right" ? "text-right" : "text-left"} 
                    ${c.width} 
                    ${c.sortable ? "cursor-pointer" : ""} 
                    ${sortKey === key ? "text-primary-five" : c.sortable ? "underline" : ""}
                  `}
                  onClick={() => c.sortable && setSortKey(key as SortKey)}
                >{c.label}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}