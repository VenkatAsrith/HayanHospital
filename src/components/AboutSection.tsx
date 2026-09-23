import { HospitalConfig } from "@/lib/config";
import MedicalImage from "./MedicalImage";

interface AboutSectionProps {
  config: HospitalConfig;
}

export default function AboutSection({ config }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Header & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Large Editorial Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow text-[#164B61] mb-2 sm:mb-3">ABOUT HAYAN HOSPITAL</p>
            <h2 className="font-section text-[#111111] tracking-tight">
              Care that begins <br />
              <span className="text-[#164B61] font-serif italic">with listening.</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#A9D7EA] mt-4 sm:mt-6 mb-6 sm:mb-8"></div>
            
            <div className="p-5 sm:p-6 bg-[#F7F8F6] rounded-xl border border-[#E5E7E7] space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#164B61]">
                Serving Kodad &amp; Suryapet
              </span>
              <p className="text-xs text-[#555555] leading-relaxed">
                Located on Huzurnagar Road, Velishala Street (Old Q Lab Building), bringing accessible, dependable medical consultations closer to regional families.
              </p>
            </div>
          </div>

          {/* Right: Human Editorial Story & Composition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-sm sm:text-base lg:text-lg text-[#444444] leading-relaxed">
            <p>
              Healthcare is deeply personal. When a parent walks in with an unsettled child, or an adult arrives facing a surgical recommendation, what matters most is not clinical jargon—it is patient reassurance, honest listening, and thoughtful medical judgement.
            </p>

            <p>
              Hayan General &amp; Children&apos;s Hospital was founded to serve the people of Kodad and neighboring mandals with modern medical standards delivered with quiet human dignity. We bring together dedicated outpatient general care, attentive paediatric consultations, and specialized laparoscopic surgical evaluations under one roof.
            </p>

            <p>
              Rather than rushing appointments, our physicians take time to explain test findings, discuss available medical pathways, and ensure that both patients and their families feel actively informed throughout their recovery.
            </p>

            <p>
              Whether it is routine child wellness monitoring or evaluating a minimally invasive surgical procedure, our commitment remains steadfast: clear communication, patient safety, and genuine clinical integrity.
            </p>

            {/* Editorial Image strip */}
            <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E5E7E7] bg-[#F7F8F6]">
                <MedicalImage
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consultation room at Hayan Hospital Kodad"
                  fill
                  fallbackType="hospital"
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E5E7E7] bg-[#F7F8F6]">
                <MedicalImage
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80"
                  alt="Reception and peaceful waiting area at Hayan Hospital"
                  fill
                  fallbackType="hospital"
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
