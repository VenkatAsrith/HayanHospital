import { Calendar, Clock, Stethoscope, ShieldCheck } from "lucide-react";
import { Doctor } from "@/lib/store";
import MedicalImage from "./MedicalImage";

interface DoctorsSectionProps {
  doctors: Doctor[];
  onBookDoctor: (doctorName: string) => void;
}

export default function DoctorsSection({ doctors, onBookDoctor }: DoctorsSectionProps) {
  return (
    <section id="doctors" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">CLINICAL TEAM</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Consulting Physicians &amp; Specialists
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#555555]">
            Our hospital brings together dedicated medical consultants committed to ethical healthcare, patient safety, and personalized clinical guidance.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-[#E5E7E7] overflow-hidden shadow-sm flex flex-col sm:flex-row hover:border-[#164B61]/40 transition-all duration-300"
            >
              {/* Doctor Image */}
              <div className="relative w-full sm:w-48 lg:w-56 aspect-[4/4] sm:aspect-auto bg-[#F7F8F6] shrink-0">
                <MedicalImage
                  src={doctor.photo}
                  alt={`${doctor.name} - ${doctor.specialization} at Hayan Hospital`}
                  fill
                  fallbackType="doctor"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 200px, 240px"
                  className="object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-[#164B61] uppercase tracking-wider shadow-sm">
                  Active Consultant
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-5 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#164B61] uppercase tracking-wider mb-1">
                    <Stethoscope className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{doctor.specialization}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#111111] tracking-tight">
                    {doctor.name}
                  </h3>

                  {doctor.qualifications && !doctor.qualifications.includes("to be updated") && (
                    <p className="text-xs font-medium text-[#7B8790] mt-1">
                      {doctor.qualifications}
                    </p>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#F0F2F2] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#626262] gap-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#164B61] shrink-0" />
                      <span>{doctor.consultationDays}</span>
                    </div>
                    <span className="font-semibold text-[#111111]">{doctor.consultationTime}</span>
                  </div>

                  <button
                    onClick={() => onBookDoctor(doctor.name)}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#F7F8F6] hover:bg-[#164B61] text-[#164B61] hover:text-white border border-[#E5E7E7] hover:border-[#164B61] py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Verification Badge */}
        <div className="mt-8 sm:mt-10 p-4 rounded-xl bg-[#F7F8F6] border border-[#E5E7E7] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start sm:items-center space-x-2 text-xs text-[#626262]">
            <ShieldCheck className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5 sm:mt-0" />
            <span>Consultation timings may vary based on surgical and clinical schedules. Pre-scheduling is advised.</span>
          </div>
          <span className="text-xs font-medium text-[#164B61]">
            Kodad, Suryapet District
          </span>
        </div>

      </div>
    </section>
  );
}
