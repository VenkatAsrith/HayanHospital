import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import MedicalImage from "./MedicalImage";

interface LaparoscopicSectionProps {
  onBookClick: () => void;
}

export default function LaparoscopicSection({ onBookClick }: LaparoscopicSectionProps) {
  const surgicalPrinciples = [
    {
      title: "Minimally Invasive Techniques",
      desc: "Small incisions paired with specialized instruments, aiming to limit muscle and tissue disruption when clinically indicated."
    },
    {
      title: "Careful Pre-Operative Assessment",
      desc: "Every procedure is preceded by comprehensive diagnostic evaluation to determine whether surgery is genuinely warranted."
    },
    {
      title: "Patient Comfort & Controlled Recovery",
      desc: "Structured post-operative protocols designed to monitor healing, minimize discomfort, and encourage gradual mobilization."
    },
    {
      title: "Transparent Clinical Discussions",
      desc: "Clear explanations provided to patients and families regarding procedural steps, anticipated recovery timelines, and precautions."
    }
  ];

  return (
    <section id="surgical" className="py-16 sm:py-24 lg:py-28 bg-[#F7F8F6] border-y border-[#E5E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">SURGICAL EXPERTISE</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Modern surgical care, <br />
            <span className="text-[#164B61]">with a thoughtful approach.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#555555] leading-relaxed">
            Laparoscopic procedures use small incisions and specialized instruments. When clinically appropriate, minimally invasive approaches may help reduce surgical trauma and support recovery.
          </p>
        </div>

        {/* Grid: Surgical Image + Clinical Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Clinical Principles */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {surgicalPrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-xl border border-[#E5E7E7] shadow-sm flex items-start space-x-3.5 sm:space-x-4"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF5F9] text-[#164B61] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#626262] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Truthful Medical Responsibility Note */}
            <div className="p-4 bg-white/80 border border-[#E0E5E7] rounded-lg flex items-start space-x-3 text-xs text-[#6B7280]">
              <ShieldAlert className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5" />
              <p>
                Clinical note: Surgical candidacy and technique are determined strictly on an individual basis by the consulting surgeon following diagnostic evaluation.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Request Surgical Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: High Quality Clinical Theatre Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7E7] bg-white shadow-sm">
              <MedicalImage
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                alt="Clinical surgical environment at Hayan Hospital Kodad"
                fill
                fallbackType="surgery"
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/60 shadow-sm">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#164B61]">
                  Sterile Clinical Standard
                </span>
                <p className="text-[11px] sm:text-xs text-[#333333] font-medium mt-0.5">
                  Equipped for laparoscopic assessments and modern surgical care in Kodad.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
