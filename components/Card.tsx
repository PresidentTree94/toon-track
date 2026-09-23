export default function Card({ data }: { data: { title: string; subtitle: string; value: string; icon: string; }}) {

  const { title, subtitle, value, icon } = data;

  return (
    <div className="bg-white border border-slate-200 hover:border-primary-five/40 p-5 rounded-2xl transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-slate-600 font-medium text-sm">{title}</p>
        <i className={`${icon} text-lg text-primary-five`}></i>
      </div>
      <h3 className="text-3xl font-extrabold mt-1 mb-2">{value}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}