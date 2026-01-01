import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// GET /api/admin/events/[id] - Get single event
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const event = await prisma.event.findUnique({
      where: { id: params.id },
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

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
 const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}

// PATCH /api/admin/events/[id] - Update event
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const body = await req.json();
    const {
      eventDate,
      time,
      title,
      location,
      description,
      published,
      endDateTime,
    } = body;

    // Build update data object
   const updateData: {
      title?: string;
      location?: string;
      description?: string;
      published?: boolean;
      endDateTime?: Date | null;
      startDateTime?: Date;
    } = {};

    // Only include fields that were provided
    if (title !== undefined) updateData.title = title;
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    if (published !== undefined) updateData.published = published;
    if (endDateTime !== undefined) updateData.endDateTime = endDateTime;

    // Handle date/time update
    if (eventDate && time) {
      const startDateTime = new Date(`${eventDate}T${time}`);

      if (isNaN(startDateTime.getTime())) {
        return NextResponse.json(
          { error: "Invalid date or time format" },
          { status: 400 }
        );
      }

      updateData.startDateTime = startDateTime;
    } else if (eventDate || time) {
      // If only one is provided, return error
      return NextResponse.json(
        {
          error: "Both eventDate and time are required to update the date/time",
        },
        { status: 400 }
      );
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Update the event
    const event = await prisma.event.update({
      where: { id: params.id },
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

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event update error:", error);

    // Handle Prisma error codes
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
    }
const message = error instanceof Error ? error.message : "Failed to update event";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/events/[id] - Delete event
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    // Check if event exists first (optional but gives better error message)
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Event deletion error:", error);

    // Handle Prisma error codes
      if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
    }

    const message = error instanceof Error ? error.message : "Failed to delete event";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}