import Link from "next/link";
import { Toon } from "@/types/toon";
import { Comp } from "@/types/comp";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAY_LIMIT = 5;

function daysAgo(date: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today.getTime() - target.getTime()) / MS_PER_DAY);
}

function joinWithAnd(arr: string[]) {
  if (arr.length === 2) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
}

export default function Notices({ verifiedWebtoons, completedData, pendingData }: {
  verifiedWebtoons: Toon[]; completedData: Comp[]; pendingData: Toon[];
}) {

  const KarlyWebtoons = verifiedWebtoons.filter(w => w.owner === "Karly" && daysAgo(new Date(w.timestamp)) <= DAY_LIMIT);
  const RachelleWebtoons = verifiedWebtoons.filter(w => w.owner === "Rachelle" && daysAgo(new Date(w.timestamp)) <= DAY_LIMIT);
  const changeOwnership = verifiedWebtoons.filter(w => daysAgo(new Date(w.owner_time)) <= DAY_LIMIT);
  const changeStatus = verifiedWebtoons.filter(w => w.status_time && daysAgo(new Date(w.status_time)) <= DAY_LIMIT);
  const completedRecently = completedData.filter(c => daysAgo(new Date(c.timestamp)) <= DAY_LIMIT);
  const missingData = [...verifiedWebtoons.filter(w => !w.genre || !w.thumbnail), ...completedData.filter(c => !c.genre || !c.thumbnail)];

  const notices = [
    {notice: KarlyWebtoons, prefix: "Karly added ", suffix: "."},
    {notice: RachelleWebtoons, prefix: "Rachelle added ", suffix: "."},
    {notice: changeOwnership, prefix: "", suffix: " changed ownership."},
    {notice: changeStatus, prefix: "", suffix: " changed status."},
    {notice: completedRecently, prefix: "", suffix: `${completedRecently.length === 1 ? " was" : " were"} archived.`},
    {notice: missingData, prefix: "", suffix: `${missingData.length === 1 ? " is" : " are"} missing data.`},
  ];

  return (
    <section className="bg-primary-one border border-primary-five/20 rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <i className="ri-notification-3-line text-primary-five text-xl"></i>
        <h2 className="text-lg">Notices</h2>
      </div>
      <ul className="inline-block mt-3 text-sm space-y-2 text-slate-700">
        {notices.map((n, index) => (
          n.notice.length > 0 && <li key={index}>
            {n.notice.length === 1 ? <>
              {n.prefix}
              <Link href={completedData.some(c => c.title === n.notice[0].title) ? "/archive" : `/library/${n.notice[0].id}`} className="underline hover:text-primary-seven">1 Webtoon</Link>
              {n.suffix}
            </> :
            <details className="space-y-1">
              <summary className="cursor-pointer hover:text-primary-seven">{n.prefix}{n.notice.length} Webtoons{n.suffix}</summary>
              {n.notice.map((w, index) => (
                <Link key={index} href={completedData.some(c => c.title === w.title) ? "/archive" : `/library/${w.id}`} className="text-primary-seven hover:text-primary-six underline ml-4 block">{w.title}</Link>
              ))}
            </details>}
          </li>
        ))}
        {pendingData.length > 0 && <li className="flex items-center gap-1.5 text-amber-700">
          <i className="ri-error-warning-line text-amber-600"></i>
          {pendingData.length === 1 ? 
              <>{pendingData[0].protagonists.split(", ")[0].split(" ")[0]}'s is pending validation.</> :
              <>{joinWithAnd(pendingData.map(p => p.protagonists.split(", ")[0].split(" ")[0] + "'s"))} are pending validation.</>
            }
        </li>}
      </ul>
    </section>
  );
}