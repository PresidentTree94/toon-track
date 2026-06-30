import { getReports, getWebtoonProtagonistsByTitle } from "@/lib/data/webtoonServerQueries";
import Card from "@/components/Card";
import Table from "@/components/Table";
import * as calc from "@/utils/calculations";

function getHighestEntry(data: Record<string, { month: string; growth: number }[]>) {
  let highest: { title: string; month: string; growth: number } | null = null;

  for (const title in data) {
    for (const entry of data[title]) {
      if (!highest || entry.growth > highest.growth) {
        highest = { title, ...entry };
      }
    }
  }

  return highest!;
}

async function getProtagonist(title: string) {
  const protagonists = await getWebtoonProtagonistsByTitle(title);
  const protagonistStr = String((protagonists as any).protagonists ?? "");
  return protagonistStr.split(", ")[0].split(" ")[0] + "'s";
}

export default async function Reports() {

  const reports: { timestamp: string; snapshot: { title: string; value: number }[] }[] = await getReports();

  const grouped = calc.groupByTitle(reports);
  const groupedByPercentGrowth = calc.buildGrowthMap(grouped, (prev, curr) => calc.calcMedianGrowth(prev!.value, curr.value), 1);
  const groupedBySubs = calc.buildGrowthMap(grouped, (_, curr) => curr.value, 0);
  const groupedBySubChange = calc.buildGrowthMap(grouped, (prev, curr) => calc.calcSubChange(prev!.value, curr.value), 1);

  const highestPercentGrowth = getHighestEntry(groupedByPercentGrowth);
  const highestSubs = getHighestEntry(groupedBySubs);
  const highestSubChange = getHighestEntry(groupedBySubChange);

  const cards = [
    {
      heading: "Highest Growth",
      value: calc.condenseValue(highestPercentGrowth.growth) + "%",
      subheading: `${await getProtagonist(highestPercentGrowth.title)} for ${highestPercentGrowth.month}`
    },
    {
      heading: "Highest Subs",
      value: calc.condenseValue(highestSubs.growth),
      subheading: `${await getProtagonist(highestSubs.title)} for ${highestSubs.month}`
    },
    {
      heading: "Highest Sub Change",
      value: calc.condenseValue(highestSubChange.growth),
      subheading: `${await getProtagonist(highestSubChange.title)} for ${highestSubChange.month}`
    }
  ];

  return (
    <article className="space-y-8">
      <h1>Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, index) => (
          <Card key={index} data={c} />
        ))}
      </div>
      <h2>Snapshots</h2>
      <Table
        headings={<>
          <th className="text-left">Timestamp</th>
          <th className="text-right">Count</th>
          <th className="text-right">Median Growth</th>
          <th className="text-right">Median Subs</th>
          <th className="text-right">Sub Change</th>
        </>}
        body={<tbody className="text-center">
          {reports.map((r, index) => {
            const medianGrowthData = calc.getDataForMonth(groupedByPercentGrowth, r.timestamp);
            const medianGrowth = medianGrowthData.length > 0 ? calc.median(medianGrowthData).toFixed(1) + "%" : "";
            const medianSubData = calc.getDataForMonth(groupedBySubs, r.timestamp);
            const medianSubs = medianSubData.length > 0 ? calc.condenseValue(calc.median(medianSubData)) : "";
            const medianSubChangeData = calc.getDataForMonth(groupedBySubChange, r.timestamp);
            const medianSubChange = medianSubChangeData.length > 0 ? calc.condenseValue(calc.median(medianSubChangeData)) : "";
            return (
              <tr key={index} className="border-t border-slate-200">
                <td className="text-left font-medium">{r.timestamp}</td>
                <td className="text-right font-mono font-semibold">{r.snapshot.length}</td>
                <td className="text-right font-bold text-green-500">{medianGrowth}</td>
                <td className="text-right font-mono font-semibold">{medianSubs}</td>
                <td className="text-right font-mono font-semibold">{medianSubChange}</td>
              </tr>
            );
          })}
        </tbody>}
      />
    </article>
  );
}