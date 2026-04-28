export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-Admin";

// GET /api/admin/events - Admin (all events)
export async function GET() {
  try {
    await requireAdmin();

    const events = await prisma.event.findMany({
      orderBy: { startDateTime: "desc" },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

// POST /api/admin/events - Admin (create event)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();

    const {
      eventDate,
      time,
      title,
      location,
      published = false,
      description,
    } = await req.json();

    if (!eventDate || !time || !title || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const startDateTime = new Date(`${eventDate}T${time}`);

    if (isNaN(startDateTime.getTime())) {
      return NextResponse.json(
        { error: "Invalid date or time format" },
        { status: 400 },
      );
    }

    //  Type assertion for session user.user
    if (!session.user?.id) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 401 },
      );
    }
    const event = await prisma.event.create({
      data: {
        title,
        location,
        description,
        startDateTime,
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

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Event creation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
