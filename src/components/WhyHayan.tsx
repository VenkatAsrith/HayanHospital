export default function WhyHayan() {
  const pillars = [
    {
      num: "01",
      title: "Personalized Attention",
      desc: "Care built around the individual patient, allowing ample time for attentive clinical discussions without feeling rushed.",
    },
    {
      num: "02",
      title: "Child-Centered Approach",
      desc: "A calmer, more reassuring medical experience for young children and their parents during stressful times.",
    },
    {
      num: "03",
      title: "Surgical Expertise",
      desc: "Focused surgical and minimally invasive laparoscopic care planned carefully where clinically appropriate.",
    },
    {
      num: "04",
      title: "Accessible Regional Care",
      desc: "Reliable medical and paediatric support located directly in Kodad, eliminating unnecessary long travel for families.",
    },
    {
      num: "05",
      title: "Clear Communication",
      desc: "Helping patients understand diagnoses, treatment options, and preventive steps in simple, direct language.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F7F8F6] border-y border-[#E5E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="eyebrow text-[#164B61] mb-3">OUR CLINICAL PILLARS</p>
          <h2 className="font-section text-[#111111] tracking-tight">
            Why patients choose Hayan.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555555]">
            Our commitment is measured by daily consistency, thorough attention, and medical responsibility.
          </p>
        </div>

        {/* 5 Qualitative Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div
              key={item.num}
              className={`bg-white p-8 rounded-xl border border-[#E5E7E7] shadow-sm flex flex-col justify-between hover:border-[#164B61]/40 transition-all duration-300 ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <span className="font-mono text-2xl font-medium text-[#164B61]">
                  {item.num}
                </span>
                <h3 className="text-xl font-semibold text-[#111111] tracking-tight mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F5F5F5] flex items-center space-x-2 text-xs text-[#8A8F93]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#164B61]/60"></span>
                <span>Core Practice Value</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
