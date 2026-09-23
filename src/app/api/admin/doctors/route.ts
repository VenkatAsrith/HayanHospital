import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const doctors = dbStore.getDoctors();
  return NextResponse.json({ doctors });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, specialization, qualifications, experience, bio, consultationDays, consultationTime, photo, bookable, isVerified } = body;

    if (!name || !specialization) {
      return NextResponse.json({ error: "Doctor name and specialization are required" }, { status: 400 });
    }

    const newDoc = dbStore.createDoctor({
      name,
      specialization,
      qualifications: qualifications || "",
      experience: experience || "",
      bio: bio || "",
      consultationDays: consultationDays || "Mon – Sat",
      consultationTime: consultationTime || "10:00 AM – 2:00 PM",
      photo: photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      bookable: bookable !== false,
      isVerified: Boolean(isVerified)
    });

    return NextResponse.json({ success: true, doctor: newDoc }, { status: 201 });
  } catch (error) {
    console.error("Create doctor error:", error);
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
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
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
    }

    const updated = dbStore.updateDoctor(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, doctor: updated });
  } catch (error) {
    console.error("Update doctor error:", error);
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
  }

  const deleted = dbStore.deleteDoctor(id);
  if (!deleted) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Doctor deleted" });
}
