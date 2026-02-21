"use client";
import { getMessagingInstance } from "@/lib/firebaseClient";
import { getToken } from "firebase/messaging";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterNotifications({ device }:Readonly<{ device: string }>) {

  async function handleRegister() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
      
      const messaging = await getMessagingInstance();
      if (!messaging) return;
      
      const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY! })
        .then((token) => {
          console.log("Token:", token);
          alert("Token: " + token);
        })
        .catch((err) => {
          console.error("Token error:", err);
          alert("Token error: " + err.message);
        });
      //if (!token) return;
      
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