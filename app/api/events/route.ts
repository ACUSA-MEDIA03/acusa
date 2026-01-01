import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/events - Public (published events only)
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        published: true,
        startDateTime: {
          gte: new Date(),
        },
      },
      orderBy: { startDateTime: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        startDateTime: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
