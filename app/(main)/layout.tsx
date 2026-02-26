import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto mb-16 md:mt-16 md:mb-0 p-8 space-y-8">{children}</main>
    </>
  );
}