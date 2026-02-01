import { User, SwatchBook, BookOpen, Calendar, Layers, Users, TrendingUp, TrendingDown, TreeDeciduous, Bot, HeartHandshake, X } from "lucide-react";
import Graph from "@/components/Graph";

export default function Detail() {

  const data = [{month: "Jan 25", value: 1}, {month: "Feb 25", value: 1}];

  return (
    <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <section className="space-y-6">
        <div className="overflow-hidden aspect-143/200 rounded-2xl">
          <img src="https://image-comic.pstatic.net/webtoon/833243/thumbnail/thumbnail_IMAG21_ea781ae5-07d1-478b-b9d0-86ebbfc4d9ea.jpg" className="object-cover h-full w-full" />
        </div>
        <div className="bg-card p-6 shadow-sm rounded-2xl @container">
          <h2 className="text-center @2xs:text-left">Duchess in Ruins</h2>
          <div className="text-center @2xs:text-left"><i>Candlebambi</i></div>
          <div className="text-center @2xs:text-left space-y-4 @2xs:space-y-2 mt-4 @2xs:mt-2">
            <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
              <div className="flex items-center gap-2"><User className="h-4 w-auto" />MC(s)</div>
              <div className="@2xs:text-right">
                <span className="font-semibold block">Edele Lancaster</span>
                <span className="font-semibold block">Laslo Krissus</span>
              </div>
            </div>
            <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
              <div className="flex items-center gap-2"><SwatchBook className="h-4 w-auto" />Genre</div>
              <span className="font-semibold">Romance</span>
            </div>
            <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
              <div className="flex items-center gap-2"><BookOpen className="h-4 w-auto" />Status</div>
              <span className="font-semibold text-green-500">Ongoing</span>
            </div>
            <div className="flex flex-col @2xs:flex-row items-center justify-between gap-1 @2xs:gap-4">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-auto" />Update</div>
              <span className="font-semibold">Monday</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 @2xs:mt-4">
              <button className="border text-emph rounded-2xl  py-2 flex items-center justify-center"><TreeDeciduous className="h-4.5 w-auto" /></button>
              <button className="border text-emph rounded-2xl py-2 flex items-center justify-center"><Bot className="h-4.5 w-auto" /></button>
              <button className="bg-primary text-white shadow-lg shadow-primary/20 rounded-2xl py-2 flex items-center justify-center"><HeartHandshake className="h-4.5 w-auto" /></button>
              <button className="border text-emph rounded-2xl py-2 flex items-center justify-center"><X className="h-4.5 w-auto" /></button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 @container">
        <div className="grid grid-cols-1 @md:grid-cols-2 md:grid-cols-2 gap-4">
          <div className="card flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-500" /></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Latest Subs</p>
              <h2>8.0k</h2>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center"><TrendingUp className="text-green-500" /></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Latest Growth</p>
              <h2>2.5%</h2>
            </div>
          </div>
        </div>
        <div className="h-75 flex-none md:h-auto md:flex-1 flex flex-col">
          <h3 className="mb-4">Subscribers</h3>
          <Graph data={data} xValues="month" yValues="value" height="100%" />
        </div>
        <div className="h-75 flex-none md:h-auto md:flex-1 flex flex-col">
          <h3 className="mb-4">Percent Growth</h3>
          <Graph data={data} xValues="month" yValues="value" height="100%" />
        </div>
      </section>
    </article>
  );
}