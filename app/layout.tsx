import type { Metadata } from "next";
import {  Space_Grotesk, Rubik_Dirt, Montserrat } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner"
const  grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  fallback: ["system-ui", "sans-serif"],
  display: 'swap',
})

const  rubik = Rubik_Dirt({
  subsets: ['latin'],
  weight: ['400',],
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
    <html lang="en" className={`${mont.variable} ${grotesk.variable} ${rubik.variable}`}>
      <body
        className={` antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
