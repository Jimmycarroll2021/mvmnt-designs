import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';
import FaqSection from '@/app/components/FaqSection';
import PackageSelectButton from '@/app/components/PackageSelectButton';

export default function Home() {
  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* 1. HERO SECTION */}
      <section className="container max-w-5xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>BOUTIQUE DIGITAL STUDIO · AUSTRALIA</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[1.08]">
          We Build Websites That Turn Visitors Into High-Value Private Clients.
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-800 font-normal leading-relaxed">
          Thoughtful editorial design, compelling clinical copywriting, and effortless booking. Built for doctors, medical specialists, and high-ticket service firms who want to be recognised as the premier choice in their field.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#scoper"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center justify-center gap-2"
          >
            Find Your Ideal Package
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gray-300 text-black text-sm font-medium hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            View Pricing & Inclusions
          </a>
        </div>

        {/* Real Human Value Proof Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gray-200 text-left">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-gray-950">5–14 Days</div>
            <div className="text-xs text-gray-700 mt-1 leading-relaxed">Fast, focused delivery without the 6-month agency drag</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-gray-950">High-Trust Words</div>
            <div className="text-xs text-gray-700 mt-1 leading-relaxed">Copy written to reassure patients and inspire confidence</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-gray-950">Bespoke Craft</div>
            <div className="text-xs text-gray-700 mt-1 leading-relaxed">Tailored to reflect the calm care of your rooms</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-gray-950">Direct Partnership</div>
            <div className="text-xs text-gray-700 mt-1 leading-relaxed">Work directly with senior creatives from kickoff to launch</div>
          </div>
        </div>
      </section>

      {/* EDITORIAL MOTION: SLOW CONTINUOUS DRIFT MARQUEE RIBBON */}
      <section className="w-full overflow-hidden border-y border-gray-200 bg-gray-50/70 py-4 select-none">
        <div className="animate-marquee flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-gray-500 whitespace-nowrap">
          <span>Private Rooms & Medical Specialists</span>
          <span className="text-gray-300">/</span>
          <span>Restorative & Aesthetic Clinics</span>
          <span className="text-gray-300">/</span>
          <span>Allied Health Practice Leaders</span>
          <span className="text-gray-300">/</span>
          <span>Independent Clinical Consultants</span>
          <span className="text-gray-300">/</span>
          <span>Effortless Patient Booking Flows</span>
          <span className="text-gray-300">/</span>
          <span>High-Trust Clinical Copywriting</span>
          <span className="text-gray-300">/</span>
          <span>Private Rooms & Medical Specialists</span>
          <span className="text-gray-300">/</span>
          <span>Restorative & Aesthetic Clinics</span>
          <span className="text-gray-300">/</span>
          <span>Allied Health Practice Leaders</span>
          <span className="text-gray-300">/</span>
          <span>Independent Clinical Consultants</span>
        </div>
      </section>

      {/* 2. INSTANT PRACTICE STRATEGY GUIDE */}
      <section className="container max-w-5xl">
        <StudioScoper />
      </section>

      {/* 3. CLIENT STORY BENCHMARK: HALI INSTITUTE */}
      <section id="casestudy" className="container max-w-5xl space-y-12">
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
              Client Case Study · Restorative Medicine
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
              Hali Institute of Restorative Medicine
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-500">
            Delivered in 10 Days · $8,800 Boutique Studio Build
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
              Elevating a Specialist Practice to Match the Calibre of Her Care.
            </h3>
            
            {/* The Brief & Decisions */}
            <div className="space-y-3 text-xs md:text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>The Brief:</strong> Dr. Jayne offers restorative medical therapies and evidence-based protocols in Canberra. Her previous web presence felt dated and generic, failing to communicate the tranquil, luxurious experience of her clinic.
              </p>
              <p>
                <strong>Key Decisions:</strong> We replaced generic medical stock graphics with high-readability editorial typography and warm neutral tones that mirror her actual consulting rooms. Complex treatments were translated into calm, patient-focused guides that proactively answer clinical questions and guide visitors directly into booking an initial consultation.
              </p>
            </div>

            {/* Deliverables Overview */}
            <div className="space-y-2.5 pt-2 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>Editorial Visual Identity:</strong> Tranquil palette and typography that ease patient anxiety.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>AHPRA-Aware Procedural Guides:</strong> Clear clinical copy reviewed thoroughly with the doctor.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>Mobile Appointment Flow:</strong> Seamless booking handoff reducing receptionist call friction.</span>
              </div>
            </div>

            {/* Direct Client Experience Quote */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs italic text-gray-800 leading-relaxed">
              &ldquo;The studio understood our medical philosophy from our first conversation. New patients now regularly mention how calm and reassuring the site felt before their initial consultation.&rdquo;
              <span className="block mt-1 font-semibold not-italic text-gray-900">— Dr. Jayne, Hali Institute</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100 group">
            <Image
              src="/images/hali_case_study_cover.png"
              alt="Hali Institute Case Study Cover"
              width={900}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
          </div>
        </div>

        {/* Visual Proof Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4 space-y-3 group hover:border-gray-400 transition-all duration-300">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/images/hali_case_study_hero.png"
                alt="Hali Institute Desktop Experience"
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="text-xs text-gray-700 font-sans">
              <strong>Desktop Presentation:</strong> Clear information hierarchy, clinical clarity, and direct consultation pathways.
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4 space-y-3 group hover:border-gray-400 transition-all duration-300">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/images/hali_case_study_menu.png"
                alt="Hali Institute Mobile Experience"
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="text-xs text-gray-700 font-sans">
              <strong>Effortless on Mobile:</strong> Intuitive navigation designed for busy patients booking from their phones.
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTISED PRICING PACKAGES */}
      <section id="pricing" className="container max-w-5xl space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Clear, Predictable Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950">
            Studio Packages & Inclusions.
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Everything you need to launch a premier web presence. No vague retainers, no hourly billing surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>01. SOLO SPECIALIST</span>
                <span>5–7 DAYS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$4,800 <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-600 mt-1">For independent practitioners & solo consultants establishing their authority.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Bespoke single-page luxury website</strong> crafted for your speciality</li>
                <li className="flex items-start gap-2">✓ <strong>Clear, persuasive copy</strong> written to position your expertise</li>
                <li className="flex items-start gap-2">✓ <strong>Consultation booking form</strong> integrated directly with your calendar</li>
                <li className="flex items-start gap-2">✓ <strong>Mobile-first polish</strong> that looks flawless on every device</li>
                <li className="flex items-start gap-2">✓ <strong>Fast 5–7 day turnaround</strong> from brief to live launch</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <PackageSelectButton
                packageTier="01. Solo Specialist Launch ($4,800 AUD)"
                className="w-full block text-center py-3.5 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                Inquire About Solo Launch →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 2 - FEATURED SWEET SPOT */}
          <div className="rounded-2xl border-2 border-black bg-white p-8 flex flex-col justify-between shadow-lg relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-white text-[10px] font-mono tracking-widest uppercase font-semibold">
              The Most Popular Choice
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>02. BOUTIQUE CLINIC</span>
                <span>10–14 DAYS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$8,800 <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-600 mt-1">Our flagship package. Exactly what was created for Dr. Jayne (Hali).</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Full multi-page editorial website</strong> for all services & treatments</li>
                <li className="flex items-start gap-2">✓ <strong>Complete clinical copywriting</strong> that answers patient questions</li>
                <li className="flex items-start gap-2">✓ <strong>Bespoke visual identity & typography</strong> tailored to your rooms</li>
                <li className="flex items-start gap-2">✓ <strong>Interactive patient assessment</strong> and enquiry qualification flow</li>
                <li className="flex items-start gap-2">✓ <strong>Google Search & local practice presence</strong> setup</li>
                <li className="flex items-start gap-2">✓ <strong>Turnkey delivery in 10–14 days</strong> with full collaborative sign-off</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <PackageSelectButton
                packageTier="02. Boutique Clinic Studio Build ($8,800 AUD)"
                className="w-full block text-center py-3.5 rounded-full bg-black text-white text-xs font-mono uppercase hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 shadow-sm font-semibold"
              >
                Choose Boutique Clinic →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>03. FULL PRACTICE TRANSFORMATION</span>
                <span>3–4 WEEKS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$16,500+ <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-600 mt-1">For multi-doctor clinics, multiple locations & scaling practices.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Multi-practitioner architecture</strong> with individual doctor profiles</li>
                <li className="flex items-start gap-2">✓ <strong>Direct practice management integration</strong> (Cliniko, Halaxy, Stripe)</li>
                <li className="flex items-start gap-2">✓ <strong>Dedicated service landing pages</strong> built for referral & ad campaigns</li>
                <li className="flex items-start gap-2">✓ <strong>Multi-location practice pages</strong> optimised for local search</li>
                <li className="flex items-start gap-2">✓ <strong>Easy content studio</strong> allowing your staff to update articles & bios</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <PackageSelectButton
                packageTier="03. Complete Practice Transformation ($16,500+ AUD)"
                className="w-full block text-center py-3.5 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                Inquire About Full Transformation →
              </PackageSelectButton>
            </div>
          </div>
        </div>

        {/* ONGOING CARE BANNER */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gray-400 transition-all duration-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-mono text-xs uppercase font-semibold text-gray-700">Studio Care & Support</span>
            </div>
            <h3 className="text-xl font-bold text-gray-950">
              $395 AUD / month · Complete Hands-Off Protection
            </h3>
            <p className="text-xs text-gray-700 max-w-xl leading-relaxed">
              We look after your website infrastructure so you can focus 100% on patient care. Includes fast managed edge hosting, regular automated backups, security monitoring, and 2 hours per month of priority text, doctor, or treatment updates.
            </p>
          </div>
          <PackageSelectButton
            packageTier="Studio Care & Peace of Mind ($395/mo)"
            className="px-6 py-3.5 rounded-full bg-white border border-gray-300 text-xs font-mono uppercase text-black hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Inquire About Studio Care →
          </PackageSelectButton>
        </div>
      </section>

      {/* 5. ELEVATED COMPARISON NARRATIVE: WHY MVMNT VS TRADITIONAL AGENCIES */}
      <section id="philosophy" className="container max-w-5xl space-y-12">
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
              THE STUDIO DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
              Why Private Practices Choose Our Direct Studio Model.
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-500">
            Direct Partnership vs Conventional Agency Drag
          </div>
        </div>

        <p className="max-w-3xl text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
          A private practice website is the digital front door of your consulting rooms. Discerning patients facing major medical decisions evaluate your clinical authority long before they step foot inside your practice.
        </p>

        {/* Dual Column Architectural Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Agency Column */}
          <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold">
                01 // THE TRADITIONAL AGENCY APPROACH
              </div>
              <h3 className="text-xl font-bold text-gray-950 leading-snug">
                Account Layers, Disconnected Writing, and Prolonged Delays
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">
                Conventional agencies often dilute attention across account managers, coordinators, and junior freelancers without healthcare experience.
              </p>
              <ul className="space-y-3.5 text-xs text-gray-700 pt-2 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-gray-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Communication Layers:</strong> You brief an account representative who delegates to junior staff. By launch, clinical nuances are often lost in translation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gray-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Excessive Client Homework:</strong> Agencies hand you lengthy questionnaires and expect doctors to write their own procedural copy from scratch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gray-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Fragile Plugin Dependencies:</strong> Sites built on generic template themes with dozens of third-party plugins that create maintenance friction.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200 text-[11px] font-mono text-gray-500 uppercase">
              Typical Timeline: 3–6 Months · High Administrative Drag
            </div>
          </div>

          {/* MVMNT Studio Standard Column */}
          <div className="p-8 rounded-2xl border-2 border-black bg-white space-y-6 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                02 // THE MVMNT STUDIO STANDARD
              </div>
              <h3 className="text-xl font-bold text-gray-950 leading-snug">
                Direct Dialogue, Turnkey Clinical Writing, and Proven Reliability
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">
                We operate as a focused, disciplined boutique studio. You collaborate directly with senior designers and developers who understand the standards expected of high-end private rooms.
              </p>
              <ul className="space-y-3.5 text-xs text-gray-700 pt-2 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Direct Partner Collaboration:</strong> Direct access to the creative and technical leads who build your site, ensuring your clinical goals are executed accurately.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Structured Clinical Review:</strong> We lead the writing process through a focused 45-minute intake discussion, producing patient-friendly drafts with full clinical review before launch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Modern Edge Engineering:</strong> Built with Next.js on managed global infrastructure with 99.9% uptime, automated backups, and fast mobile response times.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200 text-[11px] font-mono text-black font-semibold uppercase">
              Target Delivery: 7–14 Business Days · Clear Milestones
            </div>
          </div>
        </div>

        {/* Studio Editorial Manifesto Strip */}
        <div className="p-6 sm:p-8 rounded-xl bg-gray-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              STUDIO COMMITMENT
            </div>
            <p className="text-sm sm:text-base font-light text-gray-200 italic">
              &ldquo;We craft calm, high-trust digital homes for private practitioners who want to be recognised as premier leaders in their field.&rdquo;
            </p>
          </div>
          <div className="text-xs font-mono text-gray-400 whitespace-nowrap">
            AUSTRALIA-WIDE · BESPOKE PRACTICE STUDIOS
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (SEO & SCHEMA ALIGNED) */}
      <FaqSection />

      {/* 7. BOOKING CONSULTATION FORM */}
      <section className="container max-w-5xl">
        <BookingForm />
      </section>
    </div>
  );
}
