import { Phone, MessageSquare, Calendar } from "lucide-react";
import { HospitalConfig } from "@/lib/config";

interface MobileActionBarProps {
  config: HospitalConfig;
  onBookClick: () => void;
}

export default function MobileActionBar({ config, onBookClick }: MobileActionBarProps) {
  const cleanPhone = config.phone ? config.phone.replace(/[^0-9+]/g, "") : "";
  const cleanWhatsApp = config.whatsapp ? config.whatsapp.replace(/[^0-9]/g, "") : "";

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E7E7] px-4 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Call CTA */}
        {cleanPhone ? (
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#F7F8F6] text-[#164B61] active:bg-[#EAF5F9]"
            aria-label="Call Hospital Desk"
          >
            <Phone className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Call Desk</span>
          </a>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#F7F8F6] text-[#888888]">
            <Phone className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Call Desk</span>
          </div>
        )}

        {/* WhatsApp CTA */}
        {cleanWhatsApp ? (
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Hayan%20Hospital%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-50 text-emerald-700 active:bg-emerald-100"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
          </a>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-50 text-emerald-700">
            <MessageSquare className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
          </div>
        )}

        {/* Book Appointment CTA */}
        <button
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#164B61] text-white active:bg-[#0f3444]"
          aria-label="Book Consultation"
        >
          <Calendar className="w-4 h-4 mb-1 text-[#A9D7EA]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Book Visit</span>
        </button>

      </div>
    </div>
  );
}
