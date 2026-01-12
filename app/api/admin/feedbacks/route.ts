import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// GET /api/admin/feedback - Get all feedback (admin only)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = req.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Filtering
    const read = searchParams.get("read"); // "true", "false", or null
    const search = searchParams.get("search");

    // Build where clause
    const where: {
      read?: boolean;
      OR?: Array<{
        name?: { contains: string; mode: "insensitive" };
        email?: { contains: string; mode: "insensitive" };
        message?: { contains: string; mode: "insensitive" };
      }>;
    } = {};

    if (read !== null) {
      where.read = read === "true";
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get feedback with pagination
    const [feedback, total, unreadCount] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.feedback.count({ where }),
      prisma.feedback.count({ where: { read: false } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      stats: {
        unreadCount,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
