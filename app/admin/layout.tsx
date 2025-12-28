import type { Metadata } from "next";
import '../globals.css'
import Navbar from "@/component/AdminNavbar"


export const metadata: Metadata = {
    title: "ACUSA Admin Panel",
    description: "Admin Panel for ACUSA"
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` antialised`}>
               <div className="flex min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
            </body>
        </html>
    )
}