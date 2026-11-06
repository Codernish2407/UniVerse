import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "UniVerse — Everything a student needs, in one universe", description: "A connected student operating system for campus life." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
