"use client";
import RegisterNotifications from "@/components/Register";
import { WEBTOON_TAG_MARKERS } from "@/utils/constants";

export default function Settings({ webtoonsData }: { webtoonsData: any[] }) {

  const tags = [
    { icon: WEBTOON_TAG_MARKERS["Ancient"], label: "Ancient", count: webtoonsData.filter(w => w.tags.includes("Ancient")).length },
    { icon: WEBTOON_TAG_MARKERS["Medieval"], label: "Medieval", count: webtoonsData.filter(w => w.tags.includes("Medieval")).length },
    { icon: WEBTOON_TAG_MARKERS["Modern"], label: "Modern", count: webtoonsData.filter(w => w.tags.includes("Modern")).length },
    { icon: WEBTOON_TAG_MARKERS["Regression"], label: "Regression", count: webtoonsData.filter(w => w.tags.includes("Regression")).length },
    { icon: WEBTOON_TAG_MARKERS["Progression"], label: "Progression", count: webtoonsData.filter(w => w.tags.includes("Progression")).length },
    { icon: WEBTOON_TAG_MARKERS["Transmigration"], label: "Transmigration", count: webtoonsData.filter(w => w.tags.includes("Transmigration")).length }
  ];

  return (
    <article className="space-y-8 text-center md:text-left">
      <h1>Settings</h1>
      <div className="flex flex-col items-center md:items-start gap-4">
        <RegisterNotifications device="Karly" />
        <RegisterNotifications device="Rachelle" />
      </div>
      <h2>Webtoon Tag Key</h2>
      <div className="rounded-xl mt-4 shadow border border-slate-200 overflow-hidden w-fit mx-auto md:mx-0">
        <table className="bg-card/50 text-sm">
          <thead className="bg-slate-100 uppercase">
            <tr>
              <th className="text-center">Icon</th>
              <th className="text-left">Tag</th>
              <th className="text-right">Count</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {tags.map((tag, index) => (
              <tr key={index} className="border-t border-slate-200">
                <td><tag.icon className="w-5 mx-auto" /></td>
                <td className="text-left">{tag.label}</td>
                <td className="text-right font-mono">{tag.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}