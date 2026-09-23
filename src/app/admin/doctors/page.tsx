"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Users, Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import { Doctor } from "@/lib/store";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [consultationDays, setConsultationDays] = useState("Mon – Sat");
  const [consultationTime, setConsultationTime] = useState("10:00 AM – 2:00 PM");
  const [photo, setPhoto] = useState("");
  const [bookable, setBookable] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/doctors");
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch {
      alert("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openAddModal = () => {
    setEditingDoctor(null);
    setName("");
    setSpecialization("");
    setQualifications("");
    setExperience("");
    setBio("");
    setConsultationDays("Mon – Sat");
    setConsultationTime("10:00 AM – 2:00 PM");
    setPhoto("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80");
    setBookable(true);
    setIsVerified(true);
    setModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingDoctor(doc);
    setName(doc.name);
    setSpecialization(doc.specialization);
    setQualifications(doc.qualifications);
    setExperience(doc.experience);
    setBio(doc.bio);
    setConsultationDays(doc.consultationDays);
    setConsultationTime(doc.consultationTime);
    setPhoto(doc.photo);
    setBookable(doc.bookable);
    setIsVerified(doc.isVerified);
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        // Update
        const res = await fetch("/api/admin/doctors", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingDoctor.id,
            name,
            specialization,
            qualifications,
            experience,
            bio,
            consultationDays,
            consultationTime,
            photo,
            bookable,
            isVerified,
          }),
        });
        if (!res.ok) throw new Error("Failed to update");
      } else {
        // Create
        const res = await fetch("/api/admin/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            specialization,
            qualifications,
            experience,
            bio,
            consultationDays,
            consultationTime,
            photo,
            bookable,
            isVerified,
          }),
        });
        if (!res.ok) throw new Error("Failed to create");
      }
      setModalOpen(false);
      fetchDoctors();
    } catch {
      alert("Error saving doctor record");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this doctor from the roster?")) return;
    try {
      const res = await fetch(`/api/admin/doctors?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert("Error deleting doctor");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
            Clinical Faculty
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
            Doctors &amp; Specialists Roster
          </h1>
          <p className="text-xs sm:text-sm text-[#626262] mt-1">
            Manage physician credentials, consultation timings, and booking statuses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-xs text-[#8A8F93]">
            Loading doctor profiles...
          </div>
        ) : doctors.length === 0 ? (
          <div className="col-span-2 py-12 text-center bg-white rounded-xl border border-[#E5E7E7] p-8">
            <Users className="w-10 h-10 text-[#C1C9CD] mx-auto mb-3" />
            <p className="text-sm text-[#555555]">No doctors listed yet.</p>
            <p className="text-xs text-[#8A8F93] mt-1">
              Add doctor profiles with their verified specialization and consultation hours.
            </p>
          </div>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-[#E5E7E7] p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#F7F8F6] shrink-0 border border-[#E5E7E7]">
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#164B61]">
                    {doc.specialization}
                  </span>
                  <h3 className="text-lg font-semibold text-[#111111] truncate mt-0.5">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-[#7B8790]">{doc.qualifications || "Qualifications pending verification"}</p>
                  <p className="text-xs text-[#555555] mt-2 line-clamp-2">{doc.bio}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0F2F2] flex items-center justify-between text-xs">
                <div className="text-[#626262]">
                  <span className="font-semibold text-[#111111]">{doc.consultationDays}:</span> {doc.consultationTime}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(doc)}
                    className="p-1.5 text-[#164B61] hover:bg-[#EAF5F9] rounded-md transition-colors"
                    title="Edit Doctor"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Doctor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl border border-[#E5E7E7] shadow-xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h3 className="text-base font-semibold text-[#111111]">
                  {editingDoctor ? "Edit Doctor Profile" : "Add New Doctor"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-[#626262] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Name (or Consultant Title)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paediatrician & Child Health Specialist"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase font-semibold text-[#555555] mb-1">
                      Qualifications
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MBBS, DCH"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-semibold text-[#555555] mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10+ Years Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase font-semibold text-[#555555] mb-1">
                      Consultation Days
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mon – Sat"
                      value={consultationDays}
                      onChange={(e) => setConsultationDays(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-semibold text-[#555555] mb-1">
                      Consultation Timings
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM – 2:00 PM"
                      value={consultationTime}
                      onChange={(e) => setConsultationTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Clinical Bio &amp; Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Attentive clinical care..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-[#F0F2F2] flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-[#E5E7E7] rounded-lg text-xs font-semibold uppercase tracking-wider text-[#555555]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#164B61] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#0f3444]"
                  >
                    Save Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
