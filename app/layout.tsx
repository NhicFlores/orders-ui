import type { Metadata } from "next";
import {inter} from '@/app/ui/fonts';
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "Profile Landing Page",
  description: "Glass ordering home page",
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
