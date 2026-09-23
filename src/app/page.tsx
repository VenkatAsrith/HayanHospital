import { Metadata } from "next";
import { dbStore } from "@/lib/store";
import HospitalClientPage from "@/components/HospitalClientPage";

export const metadata: Metadata = {
  title: "Hayan General & Children's Hospital | Kodad, Telangana",
  description: "Healthcare and surgical care for children and families in Kodad, Suryapet, Telangana. Specialized paediatric care, laparoscopic surgical evaluations, and general consultations.",
  keywords: [
    "Hayan Hospital Kodad",
    "Children Hospital Kodad",
    "Pediatrician Kodad",
    "Laparoscopic Surgery Kodad",
    "Hayan General Hospital",
    "Hospital in Suryapet",
    "Huzurnagar Road Hospital",
    "Doctors in Kodad"
  ],
  authors: [{ name: "Hayan General & Children's Hospital" }],
  openGraph: {
    title: "Hayan General & Children's Hospital | Kodad, Telangana",
    description: "Healthcare and surgical care for children and families in Kodad, Suryapet, Telangana.",
    url: "https://hayanhospital.com",
    siteName: "Hayan General & Children's Hospital",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Hayan General & Children's Hospital Kodad",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const config = dbStore.getHospitalConfig();
  const doctors = dbStore.getDoctors();
  const services = dbStore.getServices();
  const facilities = dbStore.getFacilities();
  const faqs = dbStore.getFAQs();

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Hospital", "MedicalBusiness"],
        "@id": "https://hayanhospital.com/#hospital",
        name: config.name,
        alternateName: "Hayan Hospital Kodad",
        description: "Healthcare and surgical care for children and families in Kodad, Suryapet, Telangana.",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${config.addressLine1}, ${config.addressLine2}`,
          addressLocality: config.city,
          addressRegion: config.state,
          postalCode: config.pincode,
          addressCountry: "IN",
        },
        telephone: config.phone,
        openingHours: "Mo-Sa 09:00-20:00",
        medicalSpecialty: [
          "Pediatrics",
          "GeneralPractice",
          "Surgery"
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://hayanhospital.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://hayanhospital.com#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Contact",
            item: "https://hayanhospital.com#contact",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HospitalClientPage
        config={config}
        doctors={doctors}
        services={services}
        facilities={facilities}
        faqs={faqs}
      />
    </>
  );
}
