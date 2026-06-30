export default function Card({ data }: { data: { heading: string; value: number | string; subheading: string;} }) {
  return (
    <div className="card">
      <p className="font-medium">{data.heading}</p>
      <h2 className="mt-1 mb-2">{data.value}</h2>
      <p className="text-sm">{data.subheading}</p>
    </div>
  );
}