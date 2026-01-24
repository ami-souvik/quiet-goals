import { Inter, Lora, Roboto, Playfair_Display, Oswald, Raleway } from "next/font/google";
import "./globals.css";
import "./fonts.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const raleway = Raleway({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-raleway" });
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
      <body className={`${inter.variable} ${lora.variable} ${roboto.variable} ${playfair.variable} ${oswald.variable} ${raleway.variable} font-sans`}>
        <header className="w-full mx-auto max-w-4xl flex justify-between items-center px-4">
          <p className="font-serif text-xl md:text-2xl">Quiet Goals</p>
          <a href="https://play.google.com/store/apps/details?id=com.yourapp.package" target="_blank" rel="noopener">
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              className="w-40"
            />
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}