"use client";

import { useState, FormEvent } from "react";
import { Calendar, Phone, CheckCircle2, AlertCircle, Clock, User, ShieldCheck } from "lucide-react";
import { HospitalConfig } from "@/lib/config";

interface AppointmentSectionProps {
  config: HospitalConfig;
  preselectedService?: string;
}

export default function AppointmentSection({ config, preselectedService }: AppointmentSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [patientType, setPatientType] = useState<"child" | "adult">("child");
  const [service, setService] = useState(preselectedService || "Children's Care & Paediatrics");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9:30 AM – 1:00 PM)");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          age,
          patientType,
          service,
          preferredDate,
          preferredTime,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to submit request. Please try calling the hospital desk directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setAge("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section id="appointment" className="py-20 sm:py-28 bg-[#F7F8F6] border-y border-[#E5E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Desk Support */}
          <div className="lg:col-span-5 sticky top-28">
            <p className="eyebrow text-[#164B61] mb-3">APPOINTMENT SCHEDULING</p>
            <h2 className="font-section text-[#111111] tracking-tight">
              Request a consultation with our doctors.
            </h2>
            
            <p className="mt-5 text-base text-[#555555] leading-relaxed">
              Plan your visit ahead to help our medical desk coordinate physician availability and prepare any necessary pre-consultation guidance.
            </p>

            <div className="mt-8 p-6 bg-white rounded-xl border border-[#E5E7E7] shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-sm text-[#111111]">
                <Clock className="w-4 h-4 text-[#164B61]" />
                <span className="font-medium">Direct Telephone Inquiries</span>
              </div>
              <p className="text-xs text-[#626262] leading-relaxed">
                Prefer speaking with our receptionist directly? We welcome patient calls for quick slot availability and emergency guidance.
              </p>
              {config.phone && (
                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-[#164B61] hover:underline uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {config.phone}</span>
                </a>
              )}
            </div>

            <div className="mt-6 flex items-start space-x-2 text-xs text-[#7B8790]">
              <ShieldCheck className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5" />
              <span>Patient confidentiality is strictly respected. Your contact details are used solely to coordinate your visit.</span>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7E7] shadow-sm">
            {submitted ? (
              <div className="py-12 px-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#EAF5F9] text-[#164B61] mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-[#111111]">
                  Appointment Request Received
                </h3>
                <p className="mt-3 text-base text-[#555555] max-w-md mx-auto leading-relaxed">
                  Thank you. Your appointment request has been received. Our team will contact you at <strong className="text-[#111111]">{phone}</strong> to confirm the details.
                </p>
                <div className="mt-8">
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#164B61] hover:text-[#111111] underline"
                  >
                    <span>Submit another request</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#111111] tracking-tight">
                    Consultation Request Form
                  </h3>
                  <p className="text-xs text-[#626262] mt-1">
                    Fill out the patient details below and our team will coordinate the appointment.
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Patient Type Toggle */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-2">
                    Patient Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPatientType("child")}
                      className={`py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all ${
                        patientType === "child"
                          ? "bg-[#164B61] text-white border-[#164B61]"
                          : "bg-[#F7F8F6] text-[#555555] border-[#E5E7E7] hover:border-[#164B61]/40"
                      }`}
                    >
                      Child / Paediatric (0–16 yrs)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatientType("adult")}
                      className={`py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all ${
                        patientType === "adult"
                          ? "bg-[#164B61] text-white border-[#164B61]"
                          : "bg-[#F7F8F6] text-[#555555] border-[#E5E7E7] hover:border-[#164B61]/40"
                      }`}
                    >
                      Adult / General Care
                    </button>
                  </div>
                </div>

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    />
                  </div>
                </div>

                {/* Patient Age & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Patient Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 years / 32 years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Service / Department
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    >
                      <option value="Children's Care & Paediatrics">Children&apos;s Care &amp; Paediatrics</option>
                      <option value="Laparoscopic & Surgical Care">Laparoscopic &amp; Surgical Care</option>
                      <option value="General Medical Consultations">General Medical Consultations</option>
                      <option value="Paediatric Surgical Consultations">Paediatric Surgical Consultations</option>
                      <option value="Diagnostic & Clinical Support">Diagnostic &amp; Clinical Support</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                    >
                      <option value="Morning (9:30 AM – 1:00 PM)">Morning (9:30 AM – 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Note */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                    Brief Health Concern or Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe the symptoms or reason for consultation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61] bg-[#FDFDFD]"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#164B61] hover:bg-[#0f3444] disabled:opacity-60 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#A9D7EA]" />
                  <span>{loading ? "Submitting Request..." : "Request Appointment"}</span>
                </button>

                <p className="text-[11px] text-center text-[#8C9499]">
                  Submission does not immediately confirm the booking. Our hospital desk will verify doctor schedules and reach out via phone.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
