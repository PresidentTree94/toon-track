export default function Table({ className = "", headings, body }: {
  className?: string; headings: React.ReactNode; body: React.ReactNode;
}) {
  return (
    <div className={`w-full overflow-auto rounded-xl mt-4 shadow border border-slate-200 ${className}`}>
      <table className="text-sm w-full bg-card/50">
        <thead className="bg-slate-100 uppercase">
          <tr>
            {headings}
          </tr>
        </thead>
        {body}
      </table>
    </div>
  );
}