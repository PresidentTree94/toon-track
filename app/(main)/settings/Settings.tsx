"use client";
import RegisterNotifications from "@/components/Register";
import { WEBTOON_TAG_MARKERS } from "@/utils/constants";
import Table from "@/components/Table";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";

export default function Settings({ webtoonsData, completedData }: { webtoonsData: Toon[]; completedData: Comp[]; }) {

  const TAG_DEFINITIONS = [
    { key: "Ancient", description: "Story occurs before medieval times." },
    { key: "Medieval", description: "Story occurs in medieval times." },
    { key: "Modern", description: "Story occurs in modern times." },
    { key: "Regression", description: "MC returns to the past after death." },
    { key: "Progression", description: "MC transmigrates in the future." },
    { key: "Transmigration", description: "MC awakens as another character." },
    { key: "Male MC", description: "MC is male." },
    { key: "Female MC", description: "MC is female." },
    { key: "Non-binary MC", description: "MC is non-binary." }
  ];

  const countTags = (data: { tags: string[] }[]) =>
    data.reduce((acc, toon) => {
      toon.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

  const libraryCounts = countTags(webtoonsData);
  const archiveCounts = countTags(completedData);

  const tags = TAG_DEFINITIONS.map(({ key, description }) => ({
    icon: WEBTOON_TAG_MARKERS[key],
    label: key,
    description,
    library: libraryCounts[key] || 0,
    archive: archiveCounts[key] || 0,
    count: (libraryCounts[key] || 0) + (archiveCounts[key] || 0)
  }));

  return (
    <article className="space-y-8 text-center md:text-left">
      <h1>Settings</h1>
      <div className="flex flex-col items-center md:items-start gap-4">
        <RegisterNotifications device="Karly" />
        <RegisterNotifications device="Rachelle" />
      </div>
      <h2>Webtoon Tag Key</h2>
      <Table
        className="max-w-fit mx-auto md:mx-0"
        headings={<>
          <th className="text-center">Icon</th>
          <th className="text-left">Tag</th>
          <th className="text-left">Description</th>
          <th className="text-right">Library</th>
          <th className="text-right">Archive</th>
          <th className="text-right">Count</th>
        </>}
        body={<tbody className="font-semibold">
          {tags.map((tag, index) => (
            <tr key={index} className="border-t border-slate-200">
              <td><tag.icon className="w-5 mx-auto" /></td>
              <td className="text-left">{tag.label}</td>
              <td className="text-left font-medium">{tag.description}</td>
              <td className="text-right font-mono">{tag.library}</td>
              <td className="text-right font-mono">{tag.archive}</td>
              <td className="text-right font-mono">{tag.count}</td>
            </tr>
          ))}
        </tbody>}
      />
    </article>
  );
}