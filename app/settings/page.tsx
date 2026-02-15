import SubscribeButton from "@/components/Subscribe";

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <article className="flex flex-col items-start gap-4">
        <SubscribeButton deviceName="Karly" />
        <SubscribeButton deviceName="Rachelle" />
      </article>
    </>
  );
}