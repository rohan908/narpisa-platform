import type { Metadata } from "next";
import { Bruno_Ace, Chathura, Manrope } from "next/font/google";

import ThemeRegistry from "@/components/theme-registry";

import "./globals.css";

/** Primary UI copy: body, forms, dense UI text */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800"],
  display: "swap",
});

/** Display / “style” headings and accent typography */
const brunoAce = Bruno_Ace({
  variable: "--font-bruno-ace",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NaRPISA Platform",
  description:
    "Source-led intelligence platform for mineral value addition, document parsing, and trading workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${brunoAce.variable} antialiased`}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
