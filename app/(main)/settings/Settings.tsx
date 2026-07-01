"use client";
import RegisterNotifications from "@/components/Register";
import { WEBTOON_TAG_MARKERS } from "@/utils/constants";
import Table from "@/components/Table";

export default function Settings({ webtoonsData }: { webtoonsData: any[] }) {

  const tags = [
    {
      icon: WEBTOON_TAG_MARKERS["Ancient"],
      label: "Ancient",
      description: "Story occurs before medieval times.",
      count: webtoonsData.filter(w => w.tags.includes("Ancient")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Medieval"],
      label: "Medieval",
      description: "Story occurs in medieval times.",
      count: webtoonsData.filter(w => w.tags.includes("Medieval")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Modern"],
      label: "Modern",
      description: "Story occurs in modern times.",
      count: webtoonsData.filter(w => w.tags.includes("Modern")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Regression"],
      label: "Regression",
      description: "MC returns to the past after death.",
      count: webtoonsData.filter(w => w.tags.includes("Regression")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Progression"],
      label: "Progression",
      description: "MC transmigrates in the future.",
      count: webtoonsData.filter(w => w.tags.includes("Progression")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Transmigration"],
      label: "Transmigration",
      description: "MC awakens as another character.",
      count: webtoonsData.filter(w => w.tags.includes("Transmigration")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Male MC"],
      label: "Male MC",
      description: "MC is male.",
      count: webtoonsData.filter(w => w.tags.includes("Male MC")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Female MC"],
      label: "Female MC",
      description: "MC is female.",
      count: webtoonsData.filter(w => w.tags.includes("Female MC")).length
    },
    {
      icon: WEBTOON_TAG_MARKERS["Non-binary MC"],
      label: "Non-binary MC",
      description: "MC is non-binary.",
      count: webtoonsData.filter(w => w.tags.includes("Non-binary MC")).length
    }
  ];

  return (
    <article className="space-y-8 text-center md:text-left">
      <h1>Settings</h1>
      <div className="flex flex-col items-center md:items-start gap-4">
        <RegisterNotifications device="Karly" />
        <RegisterNotifications device="Rachelle" />
      </div>
      <h2>Webtoon Tag Key</h2>
      <Table
        className="max-w-fit mx-auto"
        headings={<>
          <th className="text-center">Icon</th>
          <th className="text-left">Tag</th>
          <th className="text-left">Description</th>
          <th className="text-right">Count</th>
        </>}
        body={<tbody className="font-semibold">
          {tags.map((tag, index) => (
            <tr key={index} className="border-t border-slate-200">
              <td><tag.icon className="w-5 mx-auto" /></td>
              <td className="text-left">{tag.label}</td>
              <td className="text-left font-medium">{tag.description}</td>
              <td className="text-right font-mono">{tag.count}</td>
            </tr>
          ))}
        </tbody>}
      />
    </article>
  );
}