import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wäinö Vänskä — Computer Graphics",
  description:
    "Computer graphics portfolio of Wäinö Vänskä, a Computer Science student at Aalto University building real-time rendering systems in C++ and OpenGL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
