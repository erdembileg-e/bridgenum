import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
});

// GIP covers Mongolian Cyrillic (Ө, Ү) in every weight; Nunito is the fallback.
const gip = localFont({
  src: [
    { path: "../public/fonts/gip-400.905da21b.woff2", weight: "400" },
    { path: "../public/fonts/gip-500.407933b3.woff2", weight: "500" },
    { path: "../public/fonts/gip-600.07db67a6.woff2", weight: "600" },
    { path: "../public/fonts/gip-700.7fba8fa4.woff2", weight: "700" },
    { path: "../public/fonts/gip-800.ff23da73.woff2", weight: "800" },
  ],
  variable: "--font-gip",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Монгол дохионы хэл",
    template: "%s · Монгол дохионы хэл",
  },
  description: "Монгол дохионы хэлний өгүүлбэр, үсгийг зургаар сураарай.",
  openGraph: {
    locale: "mn_MN",
    images: ["/signs/sain-baina-uu/steps.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn" className={`${gip.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
