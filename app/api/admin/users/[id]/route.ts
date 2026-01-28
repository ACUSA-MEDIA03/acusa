export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// PATCH /api/admin/users/[id] - Update user role
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdmin();
    const { id } = await context.params;
    const { role } = await req.json();

    // Validate role
    if (!role || !["USER", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be USER or ADMIN" },
        { status: 400 },
      );
    }

    // Prevent self-demotion (can't remove your own admin access)
    if (id === session.user.id && role === "USER") {
      return NextResponse.json(
        { error: "You cannot remove your own admin privileges" },
        { status: 403 },
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: `User ${
        role === "ADMIN" ? "promoted to" : "demoted from"
      } admin`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("User update error:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    const message =
      error instanceof Error ? error.message : "Failed to update user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] - Delete user (optional)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdmin();
    const { id } = await context.params;

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 403 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("User deletion error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
