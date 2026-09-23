"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Stethoscope, Edit2, X, CheckCircle2 } from "lucide-react";
import { HospitalService } from "@/lib/store";

export default function AdminServicesPage() {
  const [services, setServices] = useState<HospitalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<HospitalService | null>(null);

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [category, setCategory] = useState<HospitalService["category"]>("general");
  const [image, setImage] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch {
      alert("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openEdit = (serv: HospitalService) => {
    setEditingService(serv);
    setTitle(serv.title);
    setShortDesc(serv.shortDesc);
    setFullDesc(serv.fullDesc);
    setCategory(serv.category);
    setImage(serv.image);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingService.id,
          title,
          shortDesc,
          fullDesc,
          category,
          image,
        }),
      });
      if (!res.ok) throw new Error("Failed to update service");
      setEditingService(null);
      fetchServices();
    } catch {
      alert("Error updating service");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
          Clinical Offerings
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
          Hospital Services &amp; Specialties
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] mt-1">
          Edit clinical descriptions, featured images, and focus points shown on the website.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-xs text-[#8A8F93]">
            Loading services...
          </div>
        ) : (
          services.map((serv) => (
            <div
              key={serv.id}
              className="bg-white rounded-xl border border-[#E5E7E7] p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#F7F8F6] mb-4">
                  <Image
                    src={serv.image}
                    alt={serv.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-[#164B61] uppercase tracking-wider">
                    {serv.category}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#111111]">
                  {serv.title}
                </h3>
                <p className="text-xs text-[#626262] mt-2 leading-relaxed">
                  {serv.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0F2F2] flex items-center justify-between">
                <span className="text-xs text-[#8A8F93]">
                  {serv.bulletPoints?.length || 0} Key Focus Points
                </span>
                <button
                  onClick={() => openEdit(serv)}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#164B61] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Content</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditingService(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl border border-[#E5E7E7] shadow-xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h3 className="text-base font-semibold text-[#111111]">
                  Edit Service: {editingService.title}
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="p-1 text-[#626262] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as HospitalService["category"])}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm bg-white"
                  >
                    <option value="pediatric">Pediatric Care</option>
                    <option value="surgical">Surgical Care</option>
                    <option value="general">General Care</option>
                    <option value="diagnostics">Diagnostics</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Short Summary (Card Preview)
                  </label>
                  <textarea
                    rows={2}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Detailed Clinical Description
                  </label>
                  <textarea
                    rows={4}
                    value={fullDesc}
                    onChange={(e) => setFullDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-[#F0F2F2] flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 border border-[#E5E7E7] rounded-lg text-xs font-semibold uppercase tracking-wider text-[#555555]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#164B61] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#0f3444]"
                  >
                    Save Changes
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
