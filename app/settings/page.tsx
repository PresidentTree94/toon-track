import RegisterNotifications from "@/components/Register";

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <article className="flex flex-col items-start gap-4">
        <RegisterNotifications device="Karly" />
        <RegisterNotifications device="Rachelle" />
      </article>
    </>
  );
}