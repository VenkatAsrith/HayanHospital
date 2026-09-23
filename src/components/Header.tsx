"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, ArrowUpRight } from "lucide-react";
import { HospitalConfig } from "@/lib/config";

interface HeaderProps {
  config: HospitalConfig;
  onBookClick: () => void;
}

export default function Header({ config, onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Children's Care", href: "#pediatric" },
    { label: "Surgical Care", href: "#surgical" },
    { label: "Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "Patient Info", href: "#patient-info" },
    { label: "Contact", href: "#contact" },
  ];

  const cleanPhone = config.phone ? config.phone.replace(/[^0-9+]/g, "") : "";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? "py-2.5 sm:py-3 border-b border-[#E5E7E7] shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
            : "py-3.5 sm:py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Editorial Brand / Logo */}
          <Link
            href="/"
            className="group flex flex-col text-left focus:outline-none shrink-0"
            aria-label="Hayan General and Children's Hospital Home"
          >
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] leading-none">
                HAYAN
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#164B61]"></span>
            </div>
            <span className="text-[9.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[#626262] mt-0.5">
              General &amp; Children&apos;s Hospital
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] text-[#8A8F93] tracking-wider uppercase font-medium">
              Kodad • Suryapet
            </span>
          </Link>

          {/* Desktop Navigation (Visible on lg+) */}
          <nav className="hidden xl:flex items-center space-x-6 text-[13px] font-medium text-[#444444]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#164B61] transition-colors duration-150 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Medium Desktop Compact Nav (lg to xl) */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-4 text-xs font-medium text-[#444444]">
            <a href="#about" className="hover:text-[#164B61]">About</a>
            <a href="#services" className="hover:text-[#164B61]">Services</a>
            <a href="#pediatric" className="hover:text-[#164B61]">Children</a>
            <a href="#surgical" className="hover:text-[#164B61]">Surgery</a>
            <a href="#doctors" className="hover:text-[#164B61]">Doctors</a>
            <a href="#contact" className="hover:text-[#164B61]">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#164B61] hover:text-[#111111] px-2.5 py-2 rounded-lg transition-colors"
                aria-label={`Call hospital at ${config.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#164B61]" />
                <span className="hidden md:inline">Call Desk</span>
              </a>
            )}

            <button
              onClick={onBookClick}
              className="inline-flex items-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#A9D7EA]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Bar: Quick Action + Menu Toggle */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={onBookClick}
              className="inline-flex items-center bg-[#164B61] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#111111] hover:bg-[#F7F8F6] rounded-lg transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Tablet Menu Toggle (sm to lg) */}
          <div className="hidden sm:flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#111111] hover:bg-[#F7F8F6] rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile / Tablet Full Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E7E7]">
                <div>
                  <span className="text-xl font-bold tracking-tight text-[#111111]">
                    HAYAN
                  </span>
                  <p className="text-[10px] tracking-wider uppercase text-[#626262]">
                    General &amp; Children&apos;s Hospital
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#626262] hover:text-[#111111] rounded-lg hover:bg-[#F7F8F6]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col divide-y divide-[#F5F5F5]">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-[#222222] hover:text-[#164B61] py-3 flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A9D7EA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#E5E7E7] space-y-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3.5 bg-[#164B61] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#A9D7EA]" />
                <span>Request Appointment</span>
              </button>

              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full py-3 border border-[#E5E7E7] bg-[#F7F8F6] text-[#111111] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#164B61]" />
                  <span>Call Hospital Desk</span>
                </a>
              )}

              <p className="text-[11px] text-center text-[#888888] pt-1">
                Velishala Street, Huzurnagar Road, Kodad 508206
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
