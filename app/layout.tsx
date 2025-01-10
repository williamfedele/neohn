import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const inter = Lexend({
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${inter.className} antialiased dark`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
