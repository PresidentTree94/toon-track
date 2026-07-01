import { useEffect } from "react";
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

export default function Notices({ webtoonsData, verifiedWebtoons, completedData, onAnyNotices }: {
  webtoonsData: Toon[]; verifiedWebtoons: Toon[]; completedData: Comp[], onAnyNotices: (value: boolean) => void;
}) {

  const KarlyWebtoons = verifiedWebtoons.filter(w => w.owner === "Karly" && daysAgo(new Date(w.timestamp)) <= DAY_LIMIT);
  const RachelleWebtoons = verifiedWebtoons.filter(w => w.owner === "Rachelle" && daysAgo(new Date(w.timestamp)) <= DAY_LIMIT);
  const changeOwnership = verifiedWebtoons.filter(w => daysAgo(new Date(w.owner_time)) <= DAY_LIMIT);
  const changeStatus = verifiedWebtoons.filter(w => w.status_time && daysAgo(new Date(w.status_time)) <= DAY_LIMIT);
  const completedRecently = completedData.filter(c => daysAgo(new Date(c.timestamp)) <= DAY_LIMIT);
  const missingData = [...verifiedWebtoons.filter(w => !w.genre || !w.thumbnail), ...completedData.filter(c => !c.genre || !c.thumbnail)];
  const pendingData = webtoonsData.filter(item => !item.initial);
  const anyNotices = KarlyWebtoons.length + RachelleWebtoons.length + changeOwnership.length + changeStatus.length + completedRecently.length + missingData.length + pendingData.length > 0;

  useEffect(() => {
    onAnyNotices(anyNotices)
  }, [anyNotices]);

  const notices = [
    {notice: KarlyWebtoons, prefix: "Karly added ", suffix: "."},
    {notice: RachelleWebtoons, prefix: "Rachelle added ", suffix: "."},
    {notice: changeOwnership, prefix: "", suffix: " changed ownership."},
    {notice: changeStatus, prefix: "", suffix: " changed status."},
    {notice: completedRecently, prefix: "", suffix: `${completedRecently.length === 1 ? " was" : " were"} archived.`},
    {notice: missingData, prefix: "", suffix: `${missingData.length === 1 ? " is" : " are"} missing data.`},
  ];

  function joinWithAnd(arr: string[]) {
    if (arr.length === 2) return arr.join(" and ");
    return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
  }

  return (
    <>
      {anyNotices && <section className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
        <h2>Notices</h2>
        <ul className="space-y-1 mt-4">
          {notices.map((n, index) => (
            n.notice.length > 0 && <li key={index}>
              {n.notice.length === 1 ? <>
                {n.prefix}
                {n.notice.length === 1 ? completedData.some(c => c.title === n.notice[0].title) ? <Link href="/archive" className="underline">1 Webtoon</Link> : <Link href={`/library/${n.notice[0].id}`} className="underline">1 Webtoon</Link> : `${n.notice.length} Webtoons`}
                {n.suffix}
              </> :
              <details className="space-y-1">
                <summary className="cursor-pointer">{n.prefix}{n.notice.length} Webtoons{n.suffix}</summary>
                {n.notice.map((w, index) => (
                  <p key={index} className="ml-4">{completedData.some(c => c.title === w.title) ? <Link href="/archive" className="underline">{w.title}</Link> : <Link href={`/library/${w.id}`} className="underline">{w.title}</Link>}</p>
                ))}
              </details>}
            </li>
          ))}
          {pendingData.length > 0 && <li>
            {pendingData.length === 1 ? 
              <>{pendingData[0].protagonists.split(", ")[0].split(" ")[0]}'s is pending validation.</> :
              <>{joinWithAnd(pendingData.map(p => p.protagonists.split(", ")[0].split(" ")[0] + "'s"))} are pending validation.</>
            }
          </li>}
        </ul>
      </section>}
    </>
  );
}