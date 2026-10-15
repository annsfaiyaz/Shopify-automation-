import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./tailwind.css";
import "./globals.css";

const lobsterTwo = localFont({
  src: [
    { path: "./fonts/lobster-two/LobsterTwo-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/lobster-two/LobsterTwo-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/lobster-two/LobsterTwo-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/lobster-two/LobsterTwo-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-lobster-two",
  display: "swap",
  preload: false,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name — Creative Developer",
  description: "An independent portfolio at the intersection of design and code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lobsterTwo.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
