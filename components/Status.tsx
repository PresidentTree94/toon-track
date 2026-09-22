export default function Status({
  status,
  ongoing = "text-emerald-600 bg-emerald-500/10",
  hiatus = "text-amber-600 bg-amber-500/10",
  className
}: {
  status: string; ongoing?: string; hiatus?: string; className?: string;
}) {

  let statusColor;
  switch (status) {
    case "Ongoing":
      statusColor = ongoing;
      break;
    case "Hiatus":
      statusColor = hiatus;
      break;
    case "Completed":
      statusColor = "text-rose-700 bg-rose-400"
      break;
    default:
      statusColor = "bg-slate-200 text-slate-600"
      break;
  }

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${statusColor} ${className}`}>{status}</span>
  );
}