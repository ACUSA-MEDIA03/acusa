import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden - Admin access required");
  }

  return session;
}



// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function requireAdmin() {
//   console.log("=== requireAdmin called ===");

//   const session = await getServerSession(authOptions);

//   console.log("Session exists:", !!session);
//   console.log("Session user:", session?.user);
//   console.log("User role:", session?.user?.role);

//   if (!session || !session.user) {
//     console.log("❌ Not authenticated - throwing error");
//     throw new Error("Not authenticated");
//   }

//   if (session.user.role !== "ADMIN") {
//     console.log("❌ Not admin - throwing error");
//     throw new Error("Forbidden - Admin access required");
//   }

//   console.log("✅ Admin verified");
//   return session;
// }