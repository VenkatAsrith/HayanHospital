import { NextRequest, NextResponse } from "next/server";
import { dbStore, Appointment } from "@/lib/store";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();
  const { status } = body;

  const validStatuses: Appointment["status"][] = ["Pending", "Confirmed", "Completed", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  const updated = dbStore.updateAppointmentStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, appointment: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = dbStore.deleteAppointment(id);
  if (!deleted) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Appointment deleted successfully" });
}
