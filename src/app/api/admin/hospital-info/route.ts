import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const config = dbStore.getHospitalConfig();
  return NextResponse.json({ config });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const updates = await req.json();
    const updated = dbStore.updateHospitalConfig(updates);
    return NextResponse.json({ success: true, config: updated });
  } catch (error) {
    console.error("Error updating hospital config:", error);
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}
