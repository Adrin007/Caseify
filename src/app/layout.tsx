import type { Metadata } from "next";
import "./globals.css";
import {Recursive} from '@next/font/google'

const recursive = Recursive({
  subsets:['latin'],
  weight:['400','700']
})

export const metadata: Metadata = {
  title: "Caseify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={recursive.className}>
        {children}
      </body>
    </html>
  );
}
