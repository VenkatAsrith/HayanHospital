import { Heart, ShieldCheck, Users, Clock, ArrowRight } from "lucide-react";
import MedicalImage from "./MedicalImage";

interface ChildrenCareProps {
  onBookClick: () => void;
}

export default function ChildrenCareSection({ onBookClick }: ChildrenCareProps) {
  const pillars = [
    {
      icon: Heart,
      title: "Paediatric Consultation",
      desc: "Calm, gentle medical evaluations designed to make young patients feel secure and listened to.",
    },
    {
      icon: ShieldCheck,
      title: "Child-Focused Surgical Care",
      desc: "Careful clinical assessments tailored strictly to the physiological needs of growing children.",
    },
    {
      icon: Users,
      title: "Parent Guidance",
      desc: "Clear explanations, nutritional guidance, and proactive communication for mothers and fathers.",
    },
    {
      icon: Clock,
      title: "Attentive Follow-Up",
      desc: "Structured post-consultation reviews to ensure steady recovery and developmental well-being.",
    },
  ];

  return (
    <section id="pediatric" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image with Subtle Detail Card */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7E7] bg-[#F7F8F6] shadow-sm">
              <MedicalImage
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80"
                alt="Pediatric doctor calmly examining a child patient at Hayan Hospital Kodad"
                fill
                fallbackType="pediatric"
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>

            {/* Overlapping reassurance pill */}
            <div className="absolute -bottom-4 -right-1 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-xl border border-[#E5E7E7] shadow-lg max-w-[280px] sm:max-w-xs">
              <p className="text-[10px] sm:text-xs font-semibold text-[#164B61] uppercase tracking-wider">
                Child-Friendly Environment
              </p>
              <p className="text-[11px] sm:text-xs text-[#555555] mt-1 leading-normal">
                Designed to minimize clinical anxiety for infants and toddlers.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
            <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">PAEDIATRICS &amp; CHILD HEALTH</p>
            
            <h2 className="font-section text-[#111111] tracking-tight">
              Small patients. <br />
              <span className="text-[#164B61]">Thoughtful care.</span>
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#555555] leading-relaxed">
              Every child deserves care that feels reassuring, attentive, and age-appropriate. At Hayan Hospital, our pediatric consultations prioritize not just diagnosis, but the emotional ease of the child and total clarity for the family.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#E5E7E7]">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EAF5F9] text-[#164B61] flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-[#111111]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#626262] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-10">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Schedule a Paediatric Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
