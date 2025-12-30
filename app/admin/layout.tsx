import type { Metadata } from "next";
import '../globals.css'
import Navbar from "@/component/AdminNavbar"
import AuthProvider from "@/component/providers/session-provider"

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
          <Navbar />
          <main className="flex-1 p-6 bg-gray-50">
           <AuthProvider>
             {children}
            </AuthProvider>
          </main>
        </div>
            </body>
        </html>
    )
}