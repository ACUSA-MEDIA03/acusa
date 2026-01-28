export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

interface CustomSession {
  user: {
    id: string;
    role: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

// GET /api/admin/publications - Get all publications (admin)
export async function GET(req: NextRequest) {
  try {
    // console.log("📝 Publications GET started");
    await requireAdmin();
    // console.log(" Admin check passed");

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
    const published = searchParams.get("published");
    const search = searchParams.get("search");

    // console.log("📊 Query where clause:", where);
    // Build where clause
    const where: {
      category?: "ARTICLE" | "NEWSLETTER" | "OFFICIAL_LETTER" | "PODCAST";
      published?: boolean;
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        content?: { contains: string; mode: "insensitive" };
      }>;
    } = {};

    if (category) {
      where.category = category;
    }

    if (published !== null) {
      where.published = published === "true";
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    //  console.log("📊 Query where clause:", where);
    // Get publications with pagination
    const [publications, total] = await Promise.all([
      prisma.publication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.publication.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // console.log(" Publications fetched:", publications.length)
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
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

// POST /api/admin/publications - Create publication (admin)
export async function POST(req: NextRequest) {
  try {
    const session = (await requireAdmin()) as CustomSession;

    const {
      title,
      content,
      description,
      category,
      imageUrl,
      images,
      fileUrl,
      audioUrl,
      tags,
      author,
      duration,
      fileSize,
      referenceNo,
      published = false,
    } = await req.json();

    // Validation
    if (!title || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, category" },
        { status: 400 },
      );
    }

    // Category-specific validation
    const validCategories = [
      "ARTICLE",
      "NEWSLETTER",
      "OFFICIAL_LETTER",
      "PODCAST",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          error:
            "Invalid category. Must be one of: ARTICLE, NEWSLETTER, OFFICIAL_LETTER, PODCAST",
        },
        { status: 400 },
      );
    }

    // Validate based on category
    if (category === "ARTICLE" && !content) {
      return NextResponse.json(
        { error: "Articles require content" },
        { status: 400 },
      );
    }

    if (category === "NEWSLETTER" && !content) {
      return NextResponse.json(
        { error: "Newsletters require content" },
        { status: 400 },
      );
    }

    if (category === "OFFICIAL_LETTER" && !fileUrl) {
      return NextResponse.json(
        { error: "Official letters require fileUrl (PDF or image)" },
        { status: 400 },
      );
    }

    if (category === "PODCAST" && !audioUrl) {
      return NextResponse.json(
        { error: "Podcasts require audioUrl" },
        { status: 400 },
      );
    }

    //  Helper function to extract URL from string or object
    const extractUrl = (value: any): string | null => {
      if (!value) return null;
      if (typeof value === "string") return value;
      if (typeof value === "object" && value.url) return value.url;
      return null;
    };

    //  Extract URLs from potentially nested objects
    const cleanImageUrl = extractUrl(imageUrl);
    const cleanFileUrl = extractUrl(fileUrl);
    const cleanAudioUrl = extractUrl(audioUrl);
    //  Handle images array - filter out nulls with Boolean
    const cleanImages = Array.isArray(images)
      ? (images.map((img) => extractUrl(img)).filter(Boolean) as string[])
      : [];

    const publication = await prisma.publication.create({
      data: {
        title,
        content: content || "",
        description,
        category,
        imageUrl: cleanImageUrl,
        images: cleanImages,
        fileUrl: cleanFileUrl,
        audioUrl: cleanAudioUrl,
        tags: tags || [],
        author: author || null,
        duration: duration || null,
        fileSize: fileSize && fileSize !== "" ? Number(fileSize) : null,
        referenceNo: referenceNo || null,
        published,
        createdById: session.user.id,
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error("Publication creation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create publication";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}