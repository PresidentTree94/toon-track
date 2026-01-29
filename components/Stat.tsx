export default function Stat({
  heading = "Heading", number = "0", subheading = "0% from last month"
}:Readonly<{
  heading?: string;
  number?: string;
  subheading?: string;
}>) {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm">
      <p className="font-medium">{heading}</p>
      <h2 className="mt-1 mb-2">{number}</h2>
      <p className="text-sm">{subheading}</p>
    </div>
  );
}