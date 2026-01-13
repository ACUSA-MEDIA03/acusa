// app/admin/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/AdminNavbar";
import AuthProvider from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "ACUSA Admin Panel",
  description: "Admin Panel for ACUSA",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
