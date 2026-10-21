import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import "./tailwind.css";
import "./globals.css";

const nunito = localFont({
  src: [
    { path: "./fonts/Nunito/Nunito-VariableFont_wght.ttf", weight: "200 1000", style: "normal" },
    { path: "./fonts/Nunito/Nunito-Italic-VariableFont_wght.ttf", weight: "200 1000", style: "italic" },
  ],
  variable: "--font-Nunito",
  display: "swap",
  preload: true,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahsan Faiyaz — Senior Software & AI Engineer",
  description:
    "Senior software and AI engineer for SaaS, FinTech and HealthTech. I fix slow systems, ship MVPs and add AI features that work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
