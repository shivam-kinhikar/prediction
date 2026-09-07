import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email }).lean();
    
    // Check if user exists and has the ADMIN role
    if (!user || user.role !== "ADMIN") {
      // Return a generic message so we don't leak which emails exist
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify the hashed password securely
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // If valid, create a secure, HTTP-only cookie
    // This cannot be accessed by client-side JavaScript, preventing XSS attacks.
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_token',
      value: user._id.toString(), // In production, this MUST be a signed JWT, not just the ID!
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
