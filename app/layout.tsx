import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
