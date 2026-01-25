export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// GET /api/admin/publications/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const publication = await prisma.publication.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
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
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await req.json();

    const {
      title,
      content,
      description,
      category,
      imageUrl,
      images,
      fileUrl,
      audioUrl,
      referenceNo,
      tags,
      author,
      duration,
      fileSize,
      published,
    } = body;

    // ✅ PUT = enforce required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "title, content and category are required" },
        { status: 400 },
      );
    }

    const validCategories = [
      "ARTICLE",
      "NEWSLETTER",
      "OFFICIAL_LETTER",
      "PODCAST",
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const publication = await prisma.publication.update({
      where: { id },
      data: {
        title,
        content,
        description: description ?? null,
        category,
        imageUrl: imageUrl ?? null,
        images: images ?? [],
        fileUrl: fileUrl ?? null,
        audioUrl: audioUrl ?? null,
        tags: tags ?? [],
        referenceNo: referenceNo ?? null,
        author: author ?? null,
        duration: duration ?? null,
        fileSize: fileSize ?? null,
        published: published ?? false,
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

    return NextResponse.json({
      message: "Publication updated successfully",
      publication,
    });
  } catch (error) {
    console.error("Publication PUT error:", error);

    // if (error?.code === "P2025") {
    //   return NextResponse.json(
    //     { error: "Publication not found" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json(
      { error: "Failed to update publication" },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/publications/[id]
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await req.json();
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
      referenceNo,
      author,
      duration,
      fileSize,
      published,
    } = body;

    // Build update data
    const updateData: {
      title?: string;
      content?: string;
      description?: string | null;
      category?: "ARTICLE" | "NEWSLETTER" | "OFFICIAL_LETTER" | "PODCAST";
      imageUrl?: string | null;
      images?: string[];
      fileUrl?: string | null;
      audioUrl?: string | null;
      tags?: string[];
      author?: string | null;
      duration?: number | null;
      referenceNo?: string | null;
      fileSize?: number | null;
      published?: boolean;
    } = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (images !== undefined) updateData.images = images;
    if (fileUrl !== undefined) updateData.fileUrl = fileUrl;
    if (audioUrl !== undefined) updateData.audioUrl = audioUrl;
    if (tags !== undefined) updateData.tags = tags;
    if (referenceNo !== undefined) updateData.referenceNo = referenceNo;
    if (author !== undefined) updateData.author = author;
    if (duration !== undefined) updateData.duration = duration;
    if (fileSize !== undefined) updateData.fileSize = fileSize;
    if (published !== undefined) updateData.published = published;

    if (category !== undefined) {
      const validCategories = [
        "ARTICLE",
        "NEWSLETTER",
        "OFFICIAL_LETTER",
        "PODCAST",
      ];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 },
        );
      }
      updateData.category = category;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    const publication = await prisma.publication.update({
      where: { id: id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(publication);
  } catch (error) {
    console.error("Publication update error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Publication not found" },
          { status: 404 },
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Failed to update publication";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/admin/publications/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const existingPublication = await prisma.publication.findUnique({
      where: { id: id },
    });

    if (!existingPublication) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 },
      );
    }

    await prisma.publication.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Publication deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Publication deletion error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Publication not found" },
          { status: 404 },
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Failed to delete publication";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
