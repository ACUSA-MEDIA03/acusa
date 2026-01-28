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
