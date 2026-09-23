"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Image as ImageIcon, Edit2, X } from "lucide-react";
import { Facility } from "@/lib/store";

export default function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Facility["category"]>("Consultation");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/facilities");
      const data = await res.json();
      setFacilities(data.facilities || []);
    } catch {
      alert("Failed to load facilities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const openEdit = (fac: Facility) => {
    setEditingFacility(fac);
    setTitle(fac.title);
    setCategory(fac.category);
    setDescription(fac.description);
    setImage(fac.image);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    try {
      const res = await fetch("/api/admin/facilities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingFacility.id,
          title,
          category,
          description,
          image,
        }),
      });
      if (!res.ok) throw new Error("Failed to update facility");
      setEditingFacility(null);
      fetchFacilities();
    } catch {
      alert("Error saving facility");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
          Infrastructure Gallery
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
          Hospital Facilities &amp; Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#626262] mt-1">
          Manage clinical environment photographs and facility category captions.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-12 text-center text-xs text-[#8A8F93]">
            Loading facilities...
          </div>
        ) : (
          facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-[#E5E7E7] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#F7F8F6]">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-[#164B61] uppercase tracking-wider">
                    {fac.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#111111]">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-[#626262] mt-1.5 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-end">
                <button
                  onClick={() => openEdit(fac)}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#164B61] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Facility</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingFacility && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditingFacility(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl border border-[#E5E7E7] shadow-xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h3 className="text-base font-semibold text-[#111111]">
                  Edit Facility Details
                </h3>
                <button
                  onClick={() => setEditingFacility(null)}
                  className="p-1 text-[#626262] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Facility Name *
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
                    onChange={(e) => setCategory(e.target.value as Facility["category"])}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm bg-white"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Operation Theatre">Operation Theatre</option>
                    <option value="Pediatric Area">Pediatric Area</option>
                    <option value="Reception & Waiting">Reception &amp; Waiting</option>
                    <option value="Diagnostics">Diagnostics</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7E7] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#555555] mb-1">
                    Photograph URL (Cloudinary or asset)
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
                    onClick={() => setEditingFacility(null)}
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
