import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { APP_CONFIG } from "@/config/app";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { Toaster } from "@/components/shared/Toaster";
import { PreferenceApplier } from "@/features/settings/PreferenceApplier";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${APP_CONFIG.name}: ${APP_CONFIG.heroHeadline}`, template: `%s | ${APP_CONFIG.name}` },
  description: APP_CONFIG.description,
};
export const viewport: Viewport = { themeColor: "#0B1023", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-lg focus:bg-primary-strong focus:px-4 focus:py-2">Skip to content</a>
        <AuthProvider><Toaster><PreferenceApplier />{children}</Toaster></AuthProvider>
      </body>
    </html>
  );
}
