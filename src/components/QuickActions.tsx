import { ArrowRight, HeartPulse, Stethoscope, CalendarCheck } from "lucide-react";

interface QuickActionsProps {
  onBookClick: () => void;
}

export default function QuickActions({ onBookClick }: QuickActionsProps) {
  const cards = [
    {
      number: "01",
      tag: "SPECIALIZED CARE",
      title: "Children's Care",
      desc: "Focused healthcare for infants, children, and adolescents with thoughtful clinical attention.",
      cta: "Explore Care",
      href: "#pediatric",
      onClick: undefined,
      icon: HeartPulse,
      highlight: false,
    },
    {
      number: "02",
      tag: "SURGICAL EXPERTISE",
      title: "Laparoscopic & Surgical Care",
      desc: "Modern surgical care with an emphasis on appropriate minimally invasive approaches.",
      cta: "Explore Surgery",
      href: "#surgical",
      onClick: undefined,
      icon: Stethoscope,
      highlight: false,
    },
    {
      number: "03",
      tag: "DIRECT ACCESS",
      title: "Book a Consultation",
      desc: "Connect with our clinical desk to plan your family visit and confirm physician availability.",
      cta: "Book Appointment",
      href: "#appointment",
      onClick: onBookClick,
      icon: CalendarCheck,
      highlight: true,
    },
  ];

  return (
    <section className="pt-4 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group relative p-6 sm:p-8 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  card.highlight
                    ? "bg-[#F7F8F6] border-[#DCE4E7] hover:border-[#164B61]/40"
                    : "bg-white border-[#E5E7E7] hover:border-[#CBD5E1]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#EBEBEB]">
                    <span className="text-xs font-semibold tracking-wider text-[#626262] uppercase">
                      {card.tag}
                    </span>
                    <span className="text-sm font-mono text-[#8C9499]">
                      {card.number}
                    </span>
                  </div>

                  <div className="mt-6 mb-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF5F9] flex items-center justify-center text-[#164B61] group-hover:bg-[#164B61] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#555555] leading-relaxed mb-8">
                    {card.desc}
                  </p>
                </div>

                <div>
                  {card.onClick ? (
                    <button
                      onClick={card.onClick}
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-[#164B61] group-hover:text-[#111111] transition-colors"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={card.href}
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-[#164B61] group-hover:text-[#111111] transition-colors"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
