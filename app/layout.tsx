import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
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
    <html lang="mn" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
