import SubscribeButton from "@/components/Subscribe";

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <article className="flex flex-col items-start gap-4">
        <SubscribeButton deviceName="Karly's Device" />
        <SubscribeButton deviceName="Rachelle's Device" />
      </article>
    </>
  );
}