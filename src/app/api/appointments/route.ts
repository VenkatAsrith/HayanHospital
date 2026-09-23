import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, age, patientType, service, preferredDate, preferredTime, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid patient or guardian name." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return NextResponse.json(
        { error: "Please enter a valid phone number for appointment confirmation." },
        { status: 400 }
      );
    }

    if (!preferredDate) {
      return NextResponse.json(
        { error: "Please select a preferred consultation date." },
        { status: 400 }
      );
    }

    const newAppointment = dbStore.createAppointment({
      name: name.trim(),
      phone: phone.trim(),
      age: age ? String(age).trim() : "Not specified",
      patientType: patientType === "child" ? "child" : "adult",
      service: service || "General Consultation",
      preferredDate,
      preferredTime: preferredTime || "Morning",
      message: message ? String(message).trim() : undefined
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your appointment request has been received. Our team will contact you to confirm the details.",
        appointment: newAppointment
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please call the hospital desk directly." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const appointments = dbStore.getAppointments();
  return NextResponse.json({ appointments });
}
