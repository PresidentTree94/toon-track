import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client"
import { getTropes } from "@/sanity/lib/queries";
import { Trope } from "@/types/trope";

const plusJakartaSans = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToonTrack",
  description: "Track Webtoons data",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const tropesData: Trope[] = await client.fetch(getTropes, {}, { next: { tags: ["tropeDocument"] } });
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Navbar tropesData={tropesData} />
        {children}
      </body>
    </html>
  );
}
