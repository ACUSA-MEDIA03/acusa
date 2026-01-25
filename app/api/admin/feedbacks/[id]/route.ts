export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// GET /api/admin/feedback/[id] - Get single feedback
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

// PATCH /api/admin/feedback/[id] - Mark as read/unread
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();

    const { id } = await params; // Await params
    const { read } = await req.json();

    console.log("PATCH feedback ID:", id); // Debug log
    console.log("Read status:", read); // Debug log

    if (typeof read !== "boolean") {
      return NextResponse.json(
        { error: "Invalid read status. Must be true or false." },
        { status: 400 },
      );
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback update error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Feedback not found" },
          { status: 404 },
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Failed to update feedback";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/admin/feedback/[id] - Delete feedback
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();

    const { id } = await params; // Await params

    console.log("DELETE feedback ID:", id); // Debug log

    const existingFeedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!existingFeedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 },
      );
    }

    await prisma.feedback.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Feedback deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Feedback deletion error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Feedback not found" },
          { status: 404 },
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Failed to delete feedback";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
