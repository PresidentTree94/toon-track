"use client";
import { useEffect } from "react";
import { messaging } from "@/lib/firebaseConfig";
import { getToken } from "firebase/messaging";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterNotifications({ device }:Readonly<{ device: string }>) {

  useEffect(() => {
    async function register() {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!token) return;

        await supabase.from("subscriptions").upsert({ device, token });
      } catch (err) {
        console.error("FCM registration failed", err);
      }
    }

    register();
  }, [device]);

  return (
    <button className="highlight">Register Notifications ({device})</button>
  );
}