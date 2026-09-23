import Link from "next/link";
import { HospitalConfig } from "@/lib/config";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  config: HospitalConfig;
}

export default function Footer({ config }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#E5E7E7] pt-16 pb-24 sm:pb-16 text-[#444444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#EBEBEB]">
          
          {/* Left: Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="text-2xl font-bold tracking-tight text-[#111111]">
                HAYAN
              </span>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#164B61] mt-0.5">
                General &amp; Children&apos;s Hospital
              </p>
            </div>

            <p className="text-sm text-[#626262] leading-relaxed max-w-sm">
              Modern medical and surgical care designed with a human face. Serving children, individuals, and families in Kodad, Suryapet District.
            </p>

            <div className="pt-2">
              <span className="text-xs text-[#8A8F93] block">
                Velishala Street, Huzurnagar Road, Kodad 508206
              </span>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Hospital Links
            </p>
            <ul className="space-y-2 text-sm text-[#555555]">
              <li>
                <a href="#about" className="hover:text-[#164B61] transition-colors">
                  About Our Hospital
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#164B61] transition-colors">
                  Clinical Services
                </a>
              </li>
              <li>
                <a href="#pediatric" className="hover:text-[#164B61] transition-colors">
                  Children&apos;s Care
                </a>
              </li>
              <li>
                <a href="#surgical" className="hover:text-[#164B61] transition-colors">
                  Laparoscopic Surgery
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-[#164B61] transition-colors">
                  Consulting Doctors
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#164B61] transition-colors">
                  Hospital Facilities
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Desk & Emergency Contact */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Inquiries &amp; Scheduling
            </p>
            <p className="text-sm text-[#626262] leading-relaxed">
              For consultation hours, doctor availability, or emergency directions, please reach out to our hospital desk.
            </p>

            {config.phone && (
              <p className="text-sm font-semibold text-[#111111]">
                Desk Phone:{" "}
                <a
                  href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-[#164B61] hover:underline"
                >
                  {config.phone}
                </a>
              </p>
            )}

            <p className="text-xs text-[#7B8790]">
              Mon – Sat: 9:00 AM – 8:00 PM
            </p>

            <div className="pt-2">
              <Link
                href="/admin"
                className="text-xs text-[#8A8F93] hover:text-[#164B61] underline"
              >
                Hospital Staff Login
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C9499] gap-4">
          <p>
            &copy; {new Date().getFullYear()} Hayan General &amp; Children&apos;s Hospital. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <span className="hover:text-[#555555] cursor-pointer">
              Patient Privacy Policy
            </span>
            <span className="hover:text-[#555555] cursor-pointer">
              Terms of Medical Service
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-[#164B61] hover:text-[#111111]"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
