"use client"
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SubscribeButton({ deviceName }: { deviceName: string }) {
  const [status, setStatus] = useState("");

  async function subscribe() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Permission denied");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VAPID_PUBLIC_KEY
      });

      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          device: deviceName,
          subs: subscription,
          timestamp: new Date()
        }, { onConflict: "device" });

      if (error) {
        console.error(error);
        setStatus("Error saving subscription");
        return;
      }

      setStatus("Subscribed!");
    } catch (err) {
      console.error(err);
      setStatus("Error");
    }
  }

  console.log("Status:", status);

  return (
    <button onClick={subscribe} className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 cursor-pointer">Enable Notifications ({deviceName})</button>
  );
}
