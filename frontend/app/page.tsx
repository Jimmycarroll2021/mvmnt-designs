import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';

export default function Home() {
  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* 1. HERO SECTION */}
      <section className="container max-w-5xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>BOUTIQUE DIGITAL STUDIO · SYDNEY & MELBOURNE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[1.08]">
          We Build Websites That Turn Visitors Into High-Value Private Clients.
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 font-light leading-relaxed">
          Thoughtful editorial design, compelling clinical copywriting, and effortless booking. Built for doctors, medical specialists, and high-ticket service firms who want to be recognized as the premier choice in their field.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#scoper"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            Find Your Ideal Package
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gray-300 text-black text-sm font-medium hover:bg-gray-50 transition"
          >
            View Pricing & Inclusions
          </a>
        </div>

        {/* Real Human Value Proof Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gray-200 text-left">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-950">5–14 Days</div>
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">Fast, focused launch without the 6-month agency drag</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-950">High-Trust Words</div>
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">Copy written to reassure patients and inspire confidence</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-950">Bespoke Craft</div>
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">Tailored to reflect the luxury and care of your rooms</div>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-950">100% Done For You</div>
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">Design, writing, mobile polish, and booking setup included</div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT PRACTICE STRATEGY GUIDE */}
      <section className="container max-w-5xl">
        <StudioScoper />
      </section>

      {/* 3. CLIENT STORY BENCHMARK: HALI INSTITUTE (JAYNE'S SITE) */}
      <section id="casestudy" className="container max-w-5xl space-y-12">
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
              Client Case Study
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
              Hali Institute of Restorative Medicine
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-500">
            Delivered in 10 Days · $8,800 Boutique Studio Package
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
              Elevating a Specialist Practice to Match the Caliber of Her Care.
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Dr. Jayne provides world-class restorative medicine and high-ticket therapies. Yet conventional digital agencies wanted $15,000+ and 4 months of drawn-out committee meetings to produce a cookie-cutter template that didn't reflect her clinical prestige.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              We partnered directly with Jayne to understand her clinical philosophy. We designed a warm, serene aesthetic that feels like stepping into a private luxury clinic, paired with patient-friendly copywriting that makes complex medical treatments easy to understand and comfortable to book.
            </p>
            
            <div className="space-y-3 pt-2 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>Warm, High-Trust Aesthetic:</strong> Editorial layouts and tranquil tones that immediately ease patient anxieties.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>Patient-First Copywriting:</strong> Clear explanations of procedures that answer patient objections before they arise.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0"></span>
                <span><strong>Effortless Booking:</strong> Mobile-friendly inquiry flows that turn casual visitors into confirmed private consultations.</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100">
            <Image
              src="/images/hali_case_study_cover.png"
              alt="Hali Institute Case Study Cover"
              width={900}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Visual Proof Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4 space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/images/hali_case_study_hero.png"
                alt="Hali Institute Desktop Experience"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-xs text-gray-600 font-sans">
              <strong>Desktop Sanctuary:</strong> Thoughtful hierarchy, clinical clarity, and direct consultation pathways.
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4 space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/images/hali_case_study_menu.png"
                alt="Hali Institute Mobile Experience"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-xs text-gray-600 font-sans">
              <strong>Effortless on Mobile:</strong> Intuitive navigation designed for busy patients booking from their phones.
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTIZED PRICING PACKAGES */}
      <section id="pricing" className="container max-w-5xl space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Clear, Predictable Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950">
            Studio Packages & Inclusions.
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Everything you need to launch a premier web presence. No vague retainers, no hourly billing surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>01. SOLO SPECIALIST</span>
                <span>5–7 DAYS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$4,800 <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-500 mt-1">For independent practitioners & solo consultants establishing their authority.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Bespoke single-page luxury website</strong> crafted for your specialty</li>
                <li className="flex items-start gap-2">✓ <strong>Clear, persuasive copy</strong> written to position your expertise</li>
                <li className="flex items-start gap-2">✓ <strong>Consultation booking form</strong> integrated directly with your calendar</li>
                <li className="flex items-start gap-2">✓ <strong>Mobile-first polish</strong> that looks flawless on every device</li>
                <li className="flex items-start gap-2">✓ <strong>Fast 5–7 day turnaround</strong> from brief to live launch</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3.5 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition"
              >
                Inquire About Solo Launch
              </a>
            </div>
          </div>

          {/* TIER 2 - FEATURED SWEET SPOT */}
          <div className="rounded-2xl border-2 border-black bg-white p-8 flex flex-col justify-between shadow-lg relative">
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
                <div className="text-xs text-gray-500 mt-1">Our flagship package. Exactly what was created for Dr. Jayne (Hali).</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Full multi-page editorial website</strong> for all services & treatments</li>
                <li className="flex items-start gap-2">✓ <strong>Complete clinical copywriting</strong> that answers patient questions</li>
                <li className="flex items-start gap-2">✓ <strong>Bespoke visual identity & typography</strong> tailored to your rooms</li>
                <li className="flex items-start gap-2">✓ <strong>Interactive patient assessment</strong> and inquiry qualification flow</li>
                <li className="flex items-start gap-2">✓ <strong>Google Search & local practice presence</strong> setup</li>
                <li className="flex items-start gap-2">✓ <strong>Turnkey delivery in 10–14 days</strong> with zero stress</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3.5 rounded-full bg-black text-white text-xs font-mono uppercase hover:bg-gray-800 transition"
              >
                Choose Boutique Clinic →
              </a>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>03. FULL PRACTICE TRANSFORMATION</span>
                <span>3–4 WEEKS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$16,500+ <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-500 mt-1">For multi-doctor clinics, multiple locations & scaling practices.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">✓ <strong>Multi-practitioner architecture</strong> with individual doctor profiles</li>
                <li className="flex items-start gap-2">✓ <strong>Direct practice management integration</strong> (Cliniko, Halaxy, Stripe)</li>
                <li className="flex items-start gap-2">✓ <strong>Dedicated service landing pages</strong> built for referral & ad campaigns</li>
                <li className="flex items-start gap-2">✓ <strong>Multi-location practice pages</strong> optimized for local search</li>
                <li className="flex items-start gap-2">✓ <strong>Easy content studio</strong> allowing your staff to update articles & bios</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3.5 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition"
              >
                Inquire About Full Transformation
              </a>
            </div>
          </div>
        </div>

        {/* ONGOING CARE BANNER */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-mono text-xs uppercase font-semibold text-gray-700">Studio Care & Peace of Mind</span>
            </div>
            <h3 className="text-xl font-bold text-gray-950">
              $395 AUD / month · Complete Hands-Off Protection
            </h3>
            <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
              We look after your website completely so you can focus 100% on your patients. Includes ultra-fast reliable hosting, regular backups, security oversight, and 2 hours per month of priority text, doctor, or treatment updates.
            </p>
          </div>
          <a
            href="#booking"
            className="px-6 py-3.5 rounded-full bg-white border border-gray-300 text-xs font-mono uppercase text-black hover:bg-gray-100 transition whitespace-nowrap"
          >
            Inquire About Studio Care
          </a>
        </div>
      </section>

      {/* 5. WHY PRACTICES CHOOSE US */}
      <section id="philosophy" className="container max-w-5xl space-y-8">
        <div className="border-b border-gray-200 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Our Studio Difference
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-950 mt-1">
            Why Practices Choose MVMNT Over Traditional Agencies.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">01. Direct Founder Partnership</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              You work directly with the creative leaders who design and build your platform. No junior account managers, no layers of bureaucracy, and no miscommunication.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">02. Words That Actually Resonate</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              Most agencies give you an empty template and expect you to write your own copy. We take the time to understand your clinical work and write warm, reassuring copy that sounds authentic to you.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">03. Respect For Your Time</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              We know your clinical schedule is demanding. We don't drag projects out across endless committee meetings. We execute with precision and launch your new platform in days, not quarters.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOOKING CONSULTATION FORM */}
      <section className="container max-w-5xl">
        <BookingForm />
      </section>
    </div>
  );
}
