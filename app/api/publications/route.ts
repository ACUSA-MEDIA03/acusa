export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/publications - Public (with pagination and filtering)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filtering
    const category = searchParams.get("category") as
      | "ARTICLE"
      | "NEWSLETTER"
      | "OFFICIAL_LETTER"
      | "PODCAST"
      | null;

    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    // Build where clause
    const where: {
      published: boolean;
      category?: "ARTICLE" | "NEWSLETTER" | "OFFICIAL_LETTER" | "PODCAST";
      tags?: { has: string };
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        content?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
      }>;
    } = {
      published: true,
    };

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
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
          content: true,
          description: true,
          category: true,
          imageUrl: true,
          images: true,
          fileUrl: true,
          audioUrl: true,
          tags: true,
          author: true,
          duration: true,
          fileSize: true,
          createdAt: true,
          updatedAt: true,
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
    console.error("Publications fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 },
    );
  }
}
