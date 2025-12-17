import type { Metadata } from "next";
import {  Space_Grotesk, Rubik, Montserrat } from "next/font/google";
import "./globals.css";

const  grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  fallback: ["system-ui", "sans-serif"],
  display: 'swap',
})

const  rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
})
const mont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mont',
  display: 'swap',

})
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
