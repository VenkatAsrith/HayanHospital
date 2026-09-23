"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { HospitalService } from "@/lib/store";
import MedicalImage from "./MedicalImage";

interface ServicesSectionProps {
  services: HospitalService[];
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(services[0]?.id || "serv-1");

  const activeService = services.find((s) => s.id === activeTab) || services[0];
  const secondaryServices = services.filter((s) => s.id !== activeTab).slice(0, 2);

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-28 bg-[#F7F8F6] border-y border-[#E5E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">OUR SERVICES</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Healthcare designed around <br className="hidden sm:inline" />
            <span className="text-[#164B61]">every stage of care.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#555555] max-w-xl">
            From reassuring paediatric evaluations to modern laparoscopic surgical consultations, our clinical focus centers on safety, clear guidance, and patient dignity.
          </p>
        </div>

        {/* Mobile Horizontal Tabs Pill Bar (Visible < lg) */}
        <div className="lg:hidden mb-6 overflow-x-auto no-scrollbar pb-2 flex items-center space-x-2">
          {services.map((service) => {
            const isActive = service.id === activeTab;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive
                    ? "bg-[#164B61] text-white border-[#164B61] shadow-sm"
                    : "bg-white text-[#555555] border-[#E5E7E7] hover:border-[#164B61]/40"
                }`}
              >
                {service.title}
              </button>
            );
          })}
        </div>

        {/* Editorial Layout: Left Navigation + Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Vertical Service Navigation (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-xl border border-[#E5E7E7] p-3 shadow-sm sticky top-28">
            <div className="px-4 py-3 border-b border-[#F0F2F2]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8F93]">
                Clinical Departments &amp; Services
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-2">
              {services.map((service) => {
                const isActive = service.id === activeTab;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? "bg-[#164B61] text-white shadow-sm"
                        : "text-[#333333] hover:bg-[#F7F8F6] hover:text-[#111111]"
                    }`}
                  >
                    <span className="truncate pr-2">{service.title}</span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? "text-[#A9D7EA] translate-x-0.5" : "text-[#A0AAB0] group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="p-4 mt-4 bg-[#EAF5F9] rounded-lg">
              <p className="text-xs text-[#164B61] font-medium leading-relaxed">
                Need guidance choosing the right department? Contact our reception desk directly for scheduling assistance.
              </p>
            </div>
          </div>

          {/* Right: Asymmetric Feature Cards */}
          <div className="lg:col-span-8 flex flex-col space-y-6 sm:space-y-8">
            
            {/* 1 Large Feature Card */}
            {activeService && (
              <div className="bg-white rounded-2xl border border-[#E5E7E7] overflow-hidden shadow-sm group">
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EAF5F9] overflow-hidden">
                  <MedicalImage
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    fallbackType={activeService.category === "pediatric" ? "pediatric" : activeService.category === "surgical" ? "surgery" : "hospital"}
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#164B61] shadow-sm">
                    Featured Department
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#F0F2F2]">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7B8790]">
                        {activeService.category} Care
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#111111] tracking-tight mt-1">
                        {activeService.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => onSelectService(activeService.title)}
                      className="self-start sm:self-auto inline-flex items-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors active:scale-95 shadow-sm"
                    >
                      <span>Consult on This</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#555555] leading-relaxed">
                    {activeService.fullDesc || activeService.shortDesc}
                  </p>

                  {/* Service Focus Points */}
                  {activeService.bulletPoints && activeService.bulletPoints.length > 0 && (
                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#F0F2F2] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {activeService.bulletPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#444444] font-medium leading-snug">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2 Smaller Supporting Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {secondaryServices.map((subService) => (
                <div
                  key={subService.id}
                  onClick={() => setActiveTab(subService.id)}
                  className="bg-white rounded-xl border border-[#E5E7E7] p-5 sm:p-6 shadow-sm hover:border-[#164B61]/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-[#F0F2F2] mb-4">
                      <MedicalImage
                        src={subService.image}
                        alt={subService.title}
                        fill
                        fallbackType={subService.category === "pediatric" ? "pediatric" : subService.category === "surgical" ? "surgery" : "hospital"}
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A8F93]">
                      {subService.category} Care
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-[#111111] group-hover:text-[#164B61] transition-colors mt-0.5">
                      {subService.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#666666] line-clamp-2 leading-relaxed">
                      {subService.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#F5F5F5] flex items-center justify-between text-xs font-semibold text-[#164B61]">
                    <span>View Department</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
