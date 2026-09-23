"use client";

import { useState, useEffect, FormEvent } from "react";
import { HospitalConfig } from "@/lib/config";
import { Building2, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminHospitalInfoPage() {
  const [config, setConfig] = useState<HospitalConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/admin/hospital-info");
        const data = await res.json();
        setConfig(data.config);
      } catch {
        setError("Failed to load hospital configuration");
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/hospital-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setConfig(data.config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error saving changes");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="py-20 text-center text-xs text-[#8A8F93]">
        Loading hospital configuration...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
          Central Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
          Hospital Details &amp; Contact Numbers
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] mt-1">
          Changes saved here immediately update the public website, headers, contact sections, and appointment desks.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Hospital configuration updated successfully! Public website reflects new details.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7E7] shadow-sm space-y-8">
        
        {/* Basic Brand Info */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#F0F2F2]">
            General Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Hospital Full Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#F0F2F2]">
            Communication &amp; Reception Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Public Desk Phone
              </label>
              <input
                type="text"
                placeholder="+91 94400 00000"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                WhatsApp Inquiry Number
              </label>
              <input
                type="text"
                placeholder="+91 94400 00000"
                value={config.whatsapp}
                onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>
          </div>
        </div>

        {/* Verified Physical Location in Kodad */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#F0F2F2]">
            Verified Hospital Address (Kodad, Telangana)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Address Line 1
              </label>
              <input
                type="text"
                value={config.addressLine1}
                onChange={(e) => setConfig({ ...config, addressLine1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Address Line 2 (Road / Landmark)
              </label>
              <input
                type="text"
                value={config.addressLine2}
                onChange={(e) => setConfig({ ...config, addressLine2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                City / Mandal
              </label>
              <input
                type="text"
                value={config.city}
                onChange={(e) => setConfig({ ...config, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                District, State &amp; Pincode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="District"
                  value={config.district}
                  onChange={(e) => setConfig({ ...config, district: e.target.value })}
                  className="px-3 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={config.state}
                  onChange={(e) => setConfig({ ...config, state: e.target.value })}
                  className="px-3 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={config.pincode}
                  onChange={(e) => setConfig({ ...config, pincode: e.target.value })}
                  className="px-3 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours & Timings */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#F0F2F2]">
            Timings &amp; Maps Link
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Outpatient Timings Description
              </label>
              <input
                type="text"
                value={config.openingHours}
                onChange={(e) => setConfig({ ...config, openingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-1.5">
                Google Maps Direct Link
              </label>
              <input
                type="url"
                value={config.mapsUrl}
                onChange={(e) => setConfig({ ...config, mapsUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#F0F2F2] flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Hospital Information"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
