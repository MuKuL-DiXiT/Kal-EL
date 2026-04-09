import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wall Calendar - Interactive Monthly Planner",
  description: "A beautiful, interactive wall calendar application with date range selection, notes, and smooth animations.",
  keywords: [
    "calendar",
    "planner",
    "dates",
    "scheduling",
    "notes",
    "month view",
  ],
  authors: [{ name: "Kal-EL" }],
  openGraph: {
    title: "Wall Calendar",
    description: "Dynamic interactive wall calendar application",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body className="w-full overflow-hidden sm:overflow-scroll md:overflow-hidden flex flex-col items-startrt">{children}</body>
    </html>
  );
}
