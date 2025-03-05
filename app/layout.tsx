import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const font_sans = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "neohn",
  description: "A modern frontend for Hacker News.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font_sans.variable} antialiased `}>
      <body
        className={`dark text-lg`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
