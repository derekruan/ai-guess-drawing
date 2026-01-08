import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI你画我猜",
  description: "一个有趣的AI识图游戏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
