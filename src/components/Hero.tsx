import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { HospitalConfig } from "@/lib/config";
import MedicalImage from "./MedicalImage";

interface HeroProps {
  config: HospitalConfig;
  onBookClick: () => void;
}

export default function Hero({ config, onBookClick }: HeroProps) {
  return (
    <section id="hero" className="pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-8 sm:mb-12">
          
          {/* Left: Large Editorial Statement */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#164B61] bg-[#EAF5F9] px-3.5 py-1.5 rounded-full mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#164B61]"></span>
              <span>Kodad Community Healthcare</span>
            </div>
            <h1 className="font-hero text-[#111111] tracking-tight">
              Compassionate <br className="hidden sm:inline" />
              Care for Every <br />
              <span className="text-[#164B61] italic font-serif">Child &amp; Family.</span>
            </h1>
          </div>

          {/* Right: Supporting Copy & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-5 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-[#555555] leading-relaxed max-w-lg">
              Specialized healthcare and surgical care designed around the thoughtful needs of children, families, and patients in Kodad and surrounding mandals.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center space-x-2.5 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#A9D7EA]" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center space-x-2 text-[#111111] hover:text-[#164B61] text-xs sm:text-sm font-semibold uppercase tracking-wider px-5 py-3.5 rounded-full border border-[#E5E7E7] hover:border-[#164B61] transition-all duration-200 bg-white"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Subtle location indicator */}
            <div className="pt-1 flex items-center space-x-2 text-xs text-[#777777]">
              <MapPin className="w-3.5 h-3.5 text-[#164B61] shrink-0" />
              <span className="truncate">Velishala Street, Huzurnagar Road • General &amp; Paediatric Care</span>
            </div>
          </div>
        </div>

        {/* Large Dominating Hero Image (Responsive Aspect Ratio) */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E7E7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-[#F7F8F6]">
          <MedicalImage
            src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=85"
            alt="Doctor consulting with a child and family in a calm clinical environment at Hayan Hospital"
            fill
            priority
            fallbackType="pediatric"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1200px"
            className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle editorial photo caption on image */}
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 max-w-[85%] sm:max-w-md bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-white/60 shadow-sm">
            <p className="text-[11px] sm:text-xs text-[#222222] font-medium leading-snug">
              Attentive paediatric consultations &amp; modern clinical evaluations centered on family reassurance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
