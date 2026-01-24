export default function IconStat({
  topClass, middleClass = "", bottomClass = "", icon, topic, number
}:Readonly<{
  topClass:string;
  middleClass?: string;
  bottomClass?: string;
  icon: any;
  topic: string;
  number: string;
}>) {

  const Icon = icon;

  return (
    <div className={`bg-card p-7 shadow-sm rounded-2xl flex flex-col @sm:flex-row items-center gap-2 @sm:gap-4 ${topClass}`}>
      <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-auto text-primary" />
      </div>
      <div className={`flex-1 text-center @sm:text-left space-y-2 @sm:space-y-0 ${middleClass}`}>
        <p className="text-sm">{topic}</p>
        <h3 className="line-clamp-2">The Price is Your Everything</h3>
      </div>
      <div className={`text-center @sm:text-right space-y-2 @sm:space-y-0 min-w-fit ${bottomClass}`}>
        <h3 className="text-green-600 sm:text-4xl">{number}</h3>
        <p className="text-sm">this month</p>
      </div>
    </div>
  );
}