import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/publications/[id] - Get single publication by ID (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const publication = await prisma.publication.findUnique({
      where: {
        id,
        published: true, // Only fetch if published
      },
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
            email: true,
          },
        },
      },
    });

    if (!publication) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(publication);
  } catch (error) {
    console.error("Error fetching publication:", error);
    return NextResponse.json(
      { error: "Failed to fetch publication" },
      { status: 500 },
    );
  }
}
