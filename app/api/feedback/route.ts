export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/feedback - Submit feedback (public, anonymous allowed)
export async function POST(req: NextRequest) {
  try {
    const { name, email, phoneNumber, message } = await req.json();

    // Validate message (only required field)
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }
    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)" },
        { status: 400 },
      );
    }

    // Optional: Validate email format if provided
    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 },
        );
      }
    }

    // Optional: Validate phone number if provided
    if (phoneNumber && phoneNumber.trim().length > 0) {
      // Basic phone validation (10-15 digits)
      const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return NextResponse.json(
          { error: "Invalid phone number format" },
          { status: 400 },
        );
      }
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        name: name?.trim() || null,
        email: email?.trim() || null,
        phoneNumber: phoneNumber?.trim() || null,
        message: message.trim(),
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Feedback submitted successfully. Thank you!",
        feedbackId: feedback.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback. Please try again." },
      { status: 500 },
    );
  }
}
