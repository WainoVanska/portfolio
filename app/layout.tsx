import type { Metadata } from "next";
import "./globals.css";
import { introDecisionScript } from "./components/intro-state";

export const metadata: Metadata = {
  title: "Wäinö Vänskä Portfolio",
  description:
    "Computer graphics portfolio of Wäinö Vänskä, a Computer Science student at Aalto University building real-time rendering systems in C++ and OpenGL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introDecisionScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- single root layout */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
