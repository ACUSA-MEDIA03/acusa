import type { Metadata } from "next";
// import {  Space_Grotesk, Rubik, Montserrat } from "next/font/google";
import "./globals.css";
import { mont, rubik, grotesk } from "./fonts";


export const metadata: Metadata = {
  title: "Ajayi Crowther University Student Assembly ",
  description: "ACUSA ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mont.variable}`}>
      <body
        className={`${grotesk.variable} ${rubik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
