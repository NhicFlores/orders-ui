import type { Metadata } from "next";
import {inter} from '@/app/ui/styles/fonts';
import "./ui/styles/globals.css";

//layout for main app: root layout

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Glass ordering landing page",
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
          {children}
        </body>
    </html>
  );
}
