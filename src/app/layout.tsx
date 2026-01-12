import type { Metadata } from "next";
import { Inter, Lora, Roboto, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import "./fonts.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata = {
  title: "Quiet Goals — Turn milestones into calm wallpapers",
  description:
    "Quiet Goals helps you turn your most important milestone into a calm, private wallpaper. No social feeds. No notifications. Just focus.",
  keywords: [
    "milestone wallpaper",
    "goal wallpaper",
    "minimalist wallpaper",
    "focus wallpaper",
    "personal goals",
    "quiet motivation"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} ${roboto.variable} ${playfair.variable} ${oswald.variable} font-sans`}>{children}</body>
    </html>
  );
}