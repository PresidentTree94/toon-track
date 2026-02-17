import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToonTrack",
  description: "Track Webtoons subscribers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}>
        <Navbar />
        <main className="max-w-7xl mx-auto mb-16 md:mt-16 md:mb-0 p-8 space-y-8">{children}</main>
      </body>
    </html>
  );
}
