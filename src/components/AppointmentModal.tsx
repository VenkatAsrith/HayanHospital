"use client";

import { useState, FormEvent } from "react";
import { X, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { HospitalConfig } from "@/lib/config";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HospitalConfig;
  defaultService?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  config,
  defaultService,
}: AppointmentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [patientType, setPatientType] = useState<"child" | "adult">("child");
  const [service, setService] = useState(defaultService || "Children's Care & Paediatrics");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9:30 AM – 1:00 PM)");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

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

  const resetAndClose = () => {
    setName("");
    setPhone("");
    setAge("");
    setMessage("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-[#E5E7E7]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7E7] bg-[#F7F8F6]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
                Hayan Hospital • Kodad
              </span>
              <h3 className="text-lg font-semibold text-[#111111]">
                Request Consultation
              </h3>
            </div>
            <button
              onClick={resetAndClose}
              className="p-1.5 text-[#626262] hover:text-[#111111] rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#EAF5F9] text-[#164B61] mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-[#111111]">
                  Request Received
                </h4>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed">
                  Thank you. Your appointment request has been received. Our team will contact you at <strong>{phone}</strong> to confirm the details.
                </p>
                <div className="mt-6">
                  <button
                    onClick={resetAndClose}
                    className="w-full py-2.5 bg-[#164B61] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Patient Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPatientType("child")}
                      className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                        patientType === "child"
                          ? "bg-[#164B61] text-white border-[#164B61]"
                          : "bg-[#F7F8F6] text-[#555555] border-[#E5E7E7]"
                      }`}
                    >
                      Child / Paediatric
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatientType("adult")}
                      className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                        patientType === "adult"
                          ? "bg-[#164B61] text-white border-[#164B61]"
                          : "bg-[#F7F8F6] text-[#555555] border-[#E5E7E7]"
                      }`}
                    >
                      Adult / General
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                      Patient Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 yrs / 35 yrs"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61]"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                    Department
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61] bg-white"
                  >
                    <option value="Children's Care & Paediatrics">Children&apos;s Care &amp; Paediatrics</option>
                    <option value="Laparoscopic & Surgical Care">Laparoscopic &amp; Surgical Care</option>
                    <option value="General Medical Consultations">General Medical Consultations</option>
                    <option value="Paediatric Surgical Consultations">Paediatric Surgical Consultations</option>
                    <option value="Diagnostic & Clinical Support">Diagnostic &amp; Clinical Support</option>
                  </select>
                </div>

                {/* Preferred Date & Slot */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1">
                      Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-2.5 py-2 text-sm border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61] bg-white"
                    >
                      <option value="Morning (9:30 AM – 1:00 PM)">Morning</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon</option>
                      <option value="Evening (5:00 PM – 8:00 PM)">Evening</option>
                    </select>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#164B61] hover:bg-[#0f3444] disabled:opacity-50 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-[#A9D7EA]" />
                    <span>{loading ? "Submitting..." : "Request Appointment"}</span>
                  </button>
                  <p className="text-[10px] text-center text-[#8C9499] mt-2">
                    Our team will call to confirm doctor availability.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
