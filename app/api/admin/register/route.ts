import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
 
  try {
    const { name, email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {error: "Email and password are required"},
        { status: 400}
      );
    }

    //  Checks if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email}
    });

    if (existingUser) {
      return NextResponse.json(
        {error: "User already exists"},
        {status: 400}
      )
    };

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user
    const user = await prisma.user.create({
      data: {
        name, email, password: hashedPassword,
        role: "USER", // default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    return NextResponse.json(
      {user, message: "User created successfully"},
      {status: 200}
    );

  } catch (error) {
  console.error("Registration error", error);
  return NextResponse.json(
    {error: "Something went wrong"},
    { status: 500}
  );     
  }
}
