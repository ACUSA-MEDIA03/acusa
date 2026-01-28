import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/publications - Get published publications (public)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Filtering
    const category = searchParams.get("category") as
      | "ARTICLE"
      | "NEWSLETTER"
      | "OFFICIAL_LETTER"
      | "PODCAST"
      | null;
    const search = searchParams.get("search");

    // Build where clause - only published items
    const where: {
      published: boolean;
      category?: "ARTICLE" | "NEWSLETTER" | "OFFICIAL_LETTER" | "PODCAST";
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        content?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
      }>;
    } = {
      published: true, // Only fetch published publications
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get publications with pagination
    const [publications, total] = await Promise.all([
      prisma.publication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          content: true,
          category: true,
          imageUrl: true,
          images: true,
          fileUrl: true,
          audioUrl: true,
          tags: true,
          author: true,
          duration: true,
          fileSize: true,
          referenceNo: true,
          createdAt: true,
          updatedAt: true,
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.publication.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      publications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 },
    );
  }
}