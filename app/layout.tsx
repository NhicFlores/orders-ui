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
  //NOTE: In HTML, <div> cannot be a child of <html>.
  //This will cause a hydration error.
  return (
    <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Header />
          {children}
        </body>
    </html>
  );
}
