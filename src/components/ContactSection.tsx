import { MapPin, Phone, MessageSquare, Mail, Clock, ExternalLink } from "lucide-react";
import { HospitalConfig } from "@/lib/config";

interface ContactSectionProps {
  config: HospitalConfig;
}

export default function ContactSection({ config }: ContactSectionProps) {
  const cleanPhone = config.phone ? config.phone.replace(/[^0-9+]/g, "") : "";
  const cleanWhatsApp = config.whatsapp ? config.whatsapp.replace(/[^0-9]/g, "") : "";

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="eyebrow text-[#164B61] mb-3">HOSPITAL LOCATION &amp; ACCESS</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Contact &amp; Visit Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555555]">
            Centrally located in Kodad, Suryapet District. We welcome your visit and direct telephone inquiries.
          </p>
        </div>

        {/* Contact Grid: Info Cards + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Verified Location & Contact Channels */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="p-7 bg-[#F7F8F6] rounded-2xl border border-[#E5E7E7] space-y-3">
              <div className="flex items-center space-x-3 text-sm font-semibold uppercase tracking-wider text-[#164B61]">
                <MapPin className="w-4 h-4" />
                <span>Hospital Address</span>
              </div>
              <h3 className="text-xl font-bold text-[#111111]">
                {config.name}
              </h3>
              <p className="text-sm text-[#444444] leading-relaxed">
                {config.addressLine1} <br />
                {config.addressLine2} <br />
                {config.city}, {config.district} <br />
                {config.state} – {config.pincode}, {config.country}
              </p>
              
              <div className="pt-2">
                <a
                  href={config.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#164B61] hover:underline"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Call Card */}
              <div className="p-6 bg-white rounded-xl border border-[#E5E7E7] flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#EAF5F9] text-[#164B61] flex items-center justify-center mb-3">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8F93]">
                    Reception Desk
                  </span>
                  <p className="text-base font-semibold text-[#111111] mt-1">
                    {config.phone || "Telephone desk available"}
                  </p>
                </div>
                {cleanPhone && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#164B61] hover:bg-[#0f3444] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Hospital</span>
                  </a>
                )}
              </div>

              {/* WhatsApp Card */}
              <div className="p-6 bg-white rounded-xl border border-[#E5E7E7] flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8F93]">
                    WhatsApp Desk
                  </span>
                  <p className="text-base font-semibold text-[#111111] mt-1">
                    {config.whatsapp || "Inquiry chat"}
                  </p>
                </div>
                {cleanWhatsApp && (
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Hayan%20Hospital%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

            </div>

            {/* Timings & Email */}
            <div className="p-6 bg-[#F7F8F6] rounded-xl border border-[#E5E7E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
                    Outpatient Hours
                  </p>
                  <p className="text-xs text-[#555555] mt-0.5">
                    {config.openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#164B61] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
                    Email Inquiries
                  </p>
                  <p className="text-xs text-[#555555] mt-0.5">
                    {config.email}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7E7] shadow-sm bg-[#F7F8F6] relative">
              <iframe
                title="Hayan General and Children's Hospital Location Map in Kodad"
                src={config.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-white/60 shadow-sm flex items-center justify-between">
                <span className="text-xs text-[#222222] font-medium">
                  Kodad, Telangana 508206
                </span>
                <a
                  href={config.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#164B61] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
