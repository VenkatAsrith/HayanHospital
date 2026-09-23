import {
  FileText,
  Clock,
  MapPin,
  CreditCard,
  CalendarCheck,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function PatientInfo() {
  const infoCards = [
    {
      icon: CalendarCheck,
      title: "1. Booking an Appointment",
      desc: "Patients are welcomed to submit an appointment request online or call our desk directly. Prior scheduling helps minimize waiting intervals.",
    },
    {
      icon: FileText,
      title: "2. What to Bring",
      desc: "Please carry previous medical records, ongoing prescription slips, lab results, immunization books for children, and a photo ID.",
    },
    {
      icon: MapPin,
      title: "3. Finding the Hospital",
      desc: "Located on Huzurnagar Road at Velishala Street (Old Q Lab Building), easily accessible from Kodad town center and bus station.",
    },
    {
      icon: Clock,
      title: "4. Consultation Process",
      desc: "Initial vitals are recorded upon check-in, followed by thorough physician consultation, clinical evaluation, and clear treatment explanations.",
    },
    {
      icon: CreditCard,
      title: "5. Payment & Billing",
      desc: "Transparent consultation billing. We accept cash and common UPI digital payments. Official itemized receipts are provided for all visits.",
    },
    {
      icon: ShieldCheck,
      title: "6. Follow-up Visits",
      desc: "Post-consultation follow-up dates and recovery milestones will be indicated clearly on your consultation summary sheet.",
    },
    {
      icon: AlertCircle,
      title: "7. Urgent Attention",
      desc: "For urgent high fever or acute paediatric distress, please proceed directly to the hospital desk during active working hours.",
    },
    {
      icon: HelpCircle,
      title: "8. Clear Inquiries",
      desc: "Our reception staff is available to clarify any doubts regarding physician availability, timings, or visit instructions.",
    },
  ];

  return (
    <section id="patient-info" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="eyebrow text-[#164B61] mb-3">PATIENT GUIDANCE</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Before Your Visit
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555555]">
            Everything you need to know to ensure a smooth, comfortable consultation for you and your family.
          </p>
        </div>

        {/* 8 Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F8F6] p-6 rounded-xl border border-[#E5E7E7] flex flex-col justify-between hover:bg-white hover:border-[#164B61]/30 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#EAF5F9] text-[#164B61] flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#111111] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
