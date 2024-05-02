import type { Metadata } from "next";
import {inter} from '@/app/ui/styles/fonts';
import "./ui/styles/globals.css";
import Header from "./ui/header";

//layout for main app: root layout

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
      <div>
        <body className={`${inter.className} antialiased`}>
          <div>
            <Header />
          </div>
          {children}
        </body>
      </div>
    </html>
  );
}
