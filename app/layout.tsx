import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const lexend = Lexend({
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
      <body className={`${lexend.className} antialiased dark`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
