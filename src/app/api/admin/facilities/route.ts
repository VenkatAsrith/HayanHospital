import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const facilities = dbStore.getFacilities();
  return NextResponse.json({ facilities });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Facility ID is required" }, { status: 400 });
    }

    const updated = dbStore.updateFacility(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Facility not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, facility: updated });
  } catch (error) {
    console.error("Update facility error:", error);
    return NextResponse.json({ error: "Failed to update facility" }, { status: 500 });
  }
}
