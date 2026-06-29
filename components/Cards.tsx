import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";
import { median, condenseValue, calcMedianGrowth, calcSubChange } from "@/utils/calculations";

export default function Cards({ verifiedWebtoons, completedData, anyNotices }: {
  verifiedWebtoons: Toon[]; completedData: Comp[]; anyNotices: boolean;
}) {

  const growthThreshold = verifiedWebtoons.filter(item => item.data.length > 1);
  const subThreshold = verifiedWebtoons.filter(item => item.data.length > 0);

  const medianGrowth = median(growthThreshold.map(item =>
    calcMedianGrowth(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));
  const medianSubs = median(subThreshold.map(item => item.data[item.data.length - 1].value));
  const medianSubChange = median(growthThreshold.map(item =>
    calcSubChange(item.data[item.data.length - 2].value, item.data[item.data.length - 1].value)));

  const hiatus = verifiedWebtoons.filter(item => item.status === "Hiatus").length;
  const ongoing = verifiedWebtoons.length - hiatus;

  const cards = [
    {heading: "Median Growth", number: growthThreshold.length > 0 ? condenseValue(medianGrowth) + "%" : "N/E", subheading: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`},
    {heading: "Active Series", number: ongoing, subheading: `${hiatus} Hiatus, ${completedData.length} Completed`},
    {heading: "Median Subs", number: subThreshold.length > 0 ? condenseValue(medianSubs) : "N/E", subheading: `from ${subThreshold.length}/${verifiedWebtoons.length} Webtoons`},
    {heading: "Sub Change", number: growthThreshold.length > 0 ? condenseValue(medianSubChange) : "N/E", subheading: `from ${growthThreshold.length}/${verifiedWebtoons.length} Webtoons`}
  ];

  return (
    <section>
      <h2 className={`mb-4 ${anyNotices ? "block" : "hidden"}`}>Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, index) =>
          <div key={index} className="card">
            <p className="font-medium">{c.heading}</p>
            <h2 className="mt-1 mb-2">{c.number}</h2>
            <p className="text-sm">{c.subheading}</p>
          </div>
        )}
      </div>
    </section>
  );
}