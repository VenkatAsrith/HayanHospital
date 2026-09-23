"use client";

import { useState } from "react";
import { Facility } from "@/lib/store";
import MedicalImage from "./MedicalImage";

interface FacilitiesGalleryProps {
  facilities: Facility[];
}

export default function FacilitiesGallery({ facilities }: FacilitiesGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(facilities.map((f) => f.category)))];

  const filteredFacilities =
    selectedCategory === "All"
      ? facilities
      : facilities.filter((f) => f.category === selectedCategory);

  return (
    <section id="facilities" className="py-16 sm:py-24 lg:py-28 bg-[#F7F8F6] border-y border-[#E5E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">CLINICAL INFRASTRUCTURE</p>
            <h2 className="font-section text-[#111111] tracking-tight">
              Hospital Facilities
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#555555] max-w-xl">
              Clean, sterile, and calm healthcare spaces tailored to patient safety and comfortable family consultations in Kodad.
            </p>
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="overflow-x-auto no-scrollbar pb-1 flex items-center space-x-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-[#164B61] text-white shadow-sm"
                    : "bg-white text-[#555555] border border-[#E5E7E7] hover:border-[#164B61]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="group bg-white rounded-xl border border-[#E5E7E7] overflow-hidden shadow-sm hover:border-[#164B61]/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAEAEA]">
                <MedicalImage
                  src={facility.image}
                  alt={facility.title}
                  fill
                  fallbackType="hospital"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-semibold text-[#164B61] uppercase tracking-wider shadow-sm">
                  {facility.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                    {facility.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#626262] leading-relaxed line-clamp-3">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5F5F5] flex items-center justify-between text-[11px] text-[#8C9499]">
                  <span>Hayan Kodad</span>
                  <span>Sterility Assured</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
