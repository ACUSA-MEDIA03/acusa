"use server"

interface EventItem {
  id: string;
  date: number;
  suffix: "st" | "nd" | "rd" | "th";
  month: string;
  year: number;
  time: string;
  location: string;
  eventTitle: string;
  createdBy: string; 
  createdAt: string;
}


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
