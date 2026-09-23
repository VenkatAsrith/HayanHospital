"use client";

import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import QuickActions from "./QuickActions";
import ServicesSection from "./ServicesSection";
import ChildrenCareSection from "./ChildrenCareSection";
import LaparoscopicSection from "./LaparoscopicSection";
import AboutSection from "./AboutSection";
import WhyHayan from "./WhyHayan";
import DoctorsSection from "./DoctorsSection";
import FacilitiesGallery from "./FacilitiesGallery";
import PatientInfo from "./PatientInfo";
import AppointmentSection from "./AppointmentSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import AppointmentModal from "./AppointmentModal";
import { HospitalConfig } from "@/lib/config";
import { Doctor, HospitalService, Facility, FAQ } from "@/lib/store";

interface HospitalClientPageProps {
  config: HospitalConfig;
  doctors: Doctor[];
  services: HospitalService[];
  facilities: Facility[];
  faqs: FAQ[];
}

export default function HospitalClientPage({
  config,
  doctors,
  services,
  facilities,
  faqs,
}: HospitalClientPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Children's Care & Paediatrics");

  const openBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    // Check if on desktop or mobile: smooth scroll to form or open modal
    const appointmentEl = document.getElementById("appointment");
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: "smooth" });
    } else {
      setModalOpen(true);
    }
  };

  const handleSelectServiceForConsult = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const appointmentEl = document.getElementById("appointment");
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookDoctor = (doctorName: string) => {
    const appointmentEl = document.getElementById("appointment");
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: "smooth" });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#EAF5F9] selection:text-[#164B61]">
      {/* 05 — Header */}
      <Header config={config} onBookClick={() => openBooking()} />

      <main className="flex-1">
        {/* 06 & 07 — Hero Section */}
        <Hero config={config} onBookClick={() => openBooking()} />

        {/* 08 — Quick Action Cards */}
        <QuickActions onBookClick={() => openBooking()} />

        {/* 09 — Services Section */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectServiceForConsult}
        />

        {/* 10 — Children's Care Feature */}
        <ChildrenCareSection onBookClick={() => openBooking("Children's Care & Paediatrics")} />

        {/* 11 — Laparoscopic Surgery Section */}
        <LaparoscopicSection onBookClick={() => openBooking("Laparoscopic & Surgical Care")} />

        {/* 12 — About the Hospital */}
        <AboutSection config={config} />

        {/* 13 — Why Patients Choose Hayan */}
        <WhyHayan />

        {/* 14 — Doctors Section */}
        <DoctorsSection
          doctors={doctors}
          onBookDoctor={handleBookDoctor}
        />

        {/* 15 — Facilities Section */}
        <FacilitiesGallery facilities={facilities} />

        {/* 16 — Patient Information */}
        <PatientInfo />

        {/* 17 — Appointment Flow */}
        <AppointmentSection
          config={config}
          preselectedService={selectedService}
        />

        {/* Common FAQs */}
        <FAQSection faqs={faqs} />

        {/* 18 — Contact Section */}
        <ContactSection config={config} />
      </main>

      {/* 19 — Footer */}
      <Footer config={config} />

      {/* 20 — Mobile Bottom Action Bar */}
      <MobileActionBar config={config} onBookClick={() => openBooking()} />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        config={config}
        defaultService={selectedService}
      />
    </div>
  );
}
