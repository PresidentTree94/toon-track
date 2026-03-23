"use client";
import { getMessagingInstance } from "@/lib/firebaseClient";
import { getToken } from "firebase/messaging";
import { createBrowserSupabase } from "@/lib/supabaseClient";

export default function RegisterNotifications({ device }:Readonly<{ device: string }>) {

  async function handleRegister() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
      
      const messaging = await getMessagingInstance();
      if (!messaging) return;
      
      const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY! });
      if (!token) return;
      
      const supabase = createBrowserSupabase();
      await supabase.from("subscriptions").upsert({ device, token });
      console.log(`Registered device: ${device}`);
    } catch (err) {
      console.error("FCM registration failed:", err);
    }
  }

  return (
    <button className="highlight" onClick={handleRegister}>Register Notifications ({device})</button>
  );
}