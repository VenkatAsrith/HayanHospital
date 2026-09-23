import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, signAdminToken, TOKEN_NAME, ADMIN_EMAIL } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !verifyAdminCredentials(password)) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const token = signAdminToken(ADMIN_EMAIL);
    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      admin: { email: ADMIN_EMAIL }
    });

    response.cookies.set({
      name: TOKEN_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
