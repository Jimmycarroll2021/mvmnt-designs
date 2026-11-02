import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';
import FaqSection from '@/app/components/FaqSection';
import PackageSelectButton from '@/app/components/PackageSelectButton';

export default function Home() {
  return (
    <div className="space-y-24 sm:space-y-32 py-10 md:py-16">
      {/* 1. HERO SECTION (Swell-Inspired Architectural Tone) */}
      <section className="container max-w-6xl space-y-10">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
          <span className="w-2 h-2 rounded-full bg-[#f0ff50] ring-4 ring-[#f0ff50]/30 animate-pulse"></span>
          <span>MVMNT STUDIO // BRAND & DIGITAL · CANBERRA & AUSTRALIA</span>
        </div>

        {/* Master Headline */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-neutral-950 leading-[1.04]">
            We shape digital flagships and high-trust platforms that define their field.
          </h1>

          <p className="max-w-3xl text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed">
            Rooted in strategic positioning and modern edge engineering, we build bespoke web presences for medical specialists, private practices, and category leaders. Simple, yet significant.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <a
            href="#work"
            className="px-8 py-4 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-[#f0ff50] hover:text-black transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center justify-center gap-2 group"
          >
            <span>Explore Recent Work</span>
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
          <a
            href="#scoper"
            className="px-8 py-4 rounded-full bg-white border border-neutral-300 text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-50 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Studio Scoper (Calculate Scope)</span>
            <span>→</span>
          </a>
        </div>

        {/* Architectural 4-Column Proof Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-neutral-200 text-left">
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">01 // VELOCITY</div>
            <div className="text-2xl font-bold text-neutral-950 mt-2">5–14 Days</div>
            <div className="text-xs text-neutral-600 mt-1 leading-relaxed">Fast, focused delivery without 6-month agency drag</div>
          </div>
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">02 // POSITIONING</div>
            <div className="text-2xl font-bold text-neutral-950 mt-2">High-Trust Copy</div>
            <div className="text-xs text-neutral-600 mt-1 leading-relaxed">Words crafted to reassure clients and inspire confidence</div>
          </div>
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">03 // ENGINEERING</div>
            <div className="text-2xl font-bold text-neutral-950 mt-2">Modern Next.js</div>
            <div className="text-xs text-neutral-600 mt-1 leading-relaxed">Sub-second page speeds, 99.9% uptime, zero plugin bloat</div>
          </div>
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 hover:-translate-y-0.5">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">04 // COLLABORATION</div>
            <div className="text-2xl font-bold text-neutral-950 mt-2">Direct Partners</div>
            <div className="text-xs text-neutral-600 mt-1 leading-relaxed">Collaborate directly with senior creative & technical leads</div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE RIBBON (Swell Style) */}
      <section className="w-full overflow-hidden border-y border-neutral-200 bg-neutral-50 py-3.5 select-none">
        <div className="animate-marquee flex items-center gap-10 font-mono text-[11px] uppercase tracking-widest text-neutral-500 whitespace-nowrap">
          <span>Brand Identities</span>
          <span className="text-[#f0ff50]">♥</span>
          <span>Medical Specialists & Private Rooms</span>
          <span className="text-neutral-300">/</span>
          <span>High-Performance Digital Flagships</span>
          <span className="text-[#f0ff50]">♥</span>
          <span>Canberra & Sydney</span>
          <span className="text-neutral-300">/</span>
          <span>AHPRA-Aware Clinical Copywriting</span>
          <span className="text-[#f0ff50]">♥</span>
          <span>Effortless Mobile Booking Journeys</span>
          <span className="text-neutral-300">/</span>
          <span>Simple, Yet Significant</span>
          <span className="text-[#f0ff50]">♥</span>
          <span>Bespoke Engineering</span>
          <span className="text-neutral-300">/</span>
          <span>Brand Identities</span>
          <span className="text-[#f0ff50]">♥</span>
          <span>Medical Specialists & Private Rooms</span>
          <span className="text-neutral-300">/</span>
          <span>High-Performance Digital Flagships</span>
        </div>
      </section>

      {/* 2. RECENT WORK SHOWCASE (Swell-Inspired Showcase Cards) */}
      <section id="work" className="container max-w-6xl space-y-12">
        <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              FEATURED PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 mt-1">
              Recent Work.
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Selected Digital Flagships & Clinical Environments
          </div>
        </div>

        {/* WORK CARD 1: HALI INSTITUTE (Flagship Case Study) */}
        <article className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-neutral-100 font-mono text-[10px] uppercase tracking-wider text-neutral-700">
                  Brand · Digital · Clinical Experience
                </span>
                <span className="text-neutral-400 font-mono text-xs">Canberra, ACT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight">
                Hali Institute of Restorative Medicine
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Elevating a specialist practice in Canberra to match the calibre of her care. We replaced generic medical stock graphics with high-readability editorial typography and tranquil tones mirroring Dr. Jayne&apos;s physical consulting rooms.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0ff50]"></span>
                  <span>Delivered in 10 Days · $8,800 Boutique Studio Build</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>AHPRA-Aware Procedural Guides & Direct Patient Intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>Mobile-First Booking Flow Reducing Receptionist Drag</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs italic text-neutral-800 leading-relaxed font-sans">
                &ldquo;The studio understood our medical philosophy from our first conversation. New patients now regularly mention how calm and reassuring the site felt before their initial consultation.&rdquo;
                <span className="block mt-1 font-semibold not-italic font-mono text-[11px] text-neutral-900">
                  — Dr. Jayne, Founder
                </span>
              </div>

              <div className="pt-2">
                <a
                  href="#casestudy-gallery"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black font-semibold hover:text-[#979797] transition-colors"
                >
                  <span>View Case Study Gallery</span>
                  <span>↓</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
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
          </div>
        </article>

        {/* WORK CARD 2 & 3 GRID */}
        <div id="casestudy-gallery" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 2: MVMNT Club */}
          <article className="rounded-3xl border border-neutral-200 bg-white p-8 space-y-6 hover:shadow-lg transition-all duration-300 group">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-100">
              <Image
                src="/images/hali_case_study_hero.png"
                alt="Desktop Experience Preview"
                width={800}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider">
                  Digital Flagship
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>MVMNT CLUB</span>
                <span>AUSTRALIA</span>
              </div>
              <h4 className="text-xl font-bold text-neutral-950">
                Custom Cycling Apparel & Club Portals
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Headless high-performance apparel engine with zero-float custom kit portals, 3D concept visualization, and real-time Shopify synchronization.
              </p>
            </div>
          </article>

          {/* Card 3: Mobile Experience / Foreshore Architecture */}
          <article className="rounded-3xl border border-neutral-200 bg-white p-8 space-y-6 hover:shadow-lg transition-all duration-300 group">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-100">
              <Image
                src="/images/hali_case_study_menu.png"
                alt="Mobile Experience Preview"
                width={800}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider">
                  Mobile Architecture
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>CLINICAL EXPERIENCE</span>
                <span>CANBERRA</span>
              </div>
              <h4 className="text-xl font-bold text-neutral-950">
                Frictionless Mobile Patient Booking
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Designed specifically for high-intent visitors booking from mobile screens. Clear procedure breakdown, reassuring clinical tone, and instant qualification.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 3. DISCIPLINES (Swell's Brand, Digital, Spatial Triad) */}
      <section id="disciplines" className="container max-w-6xl space-y-12">
        <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              STUDIO EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 mt-1">
              Disciplines.
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Strategy, Design & Modern Engineering
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Discipline 1: Brand */}
          <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between space-y-8 hover:border-black transition-colors duration-300">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                DISCIPLINE // 01
              </div>
              <h3 className="text-2xl font-bold text-neutral-950">
                Brand & Positioning
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                We design brand identities and write clinical copy that help ambitious practices lead with distinct authority. Thoughtful typography, tranquil palettes, and persuasive messaging that reassure anxious patients.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-200 pt-6">
              <li>→ Visual Identity & Art Direction</li>
              <li>→ Clinical & Commercial Copywriting</li>
              <li>→ AHPRA-Aware Practice Guides</li>
              <li>→ Brand Guidelines & Typography</li>
            </ul>
          </div>

          {/* Discipline 2: Digital */}
          <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between space-y-8 hover:border-black transition-colors duration-300">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                DISCIPLINE // 02
              </div>
              <h3 className="text-2xl font-bold text-neutral-950">
                Digital Flagships
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                Fast, reliable, and functional. Custom Next.js web platforms built from concept to live deployment with sub-second page loads, fluid responsive interactions, and zero fragile template dependencies.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-200 pt-6">
              <li>→ Modern Next.js Edge Development</li>
              <li>→ Sub-Second Mobile Interactions</li>
              <li>→ 99.9% Uptime & Automated Backups</li>
              <li>→ Core Web Vitals Optimization</li>
            </ul>
          </div>

          {/* Discipline 3: Clinic Systems */}
          <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between space-y-8 hover:border-black transition-colors duration-300">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                DISCIPLINE // 03
              </div>
              <h3 className="text-2xl font-bold text-neutral-950">
                Clinic & Booking Systems
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                Turnkey appointment funnels that convert visitors into booked consultations. Seamless integration with Cliniko, Halaxy, Stripe, and modern clinic software without losing visitors to jarring redirects.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-200 pt-6">
              <li>→ Direct Practice Software Integration</li>
              <li>→ Multi-Practitioner Directories</li>
              <li>→ Secure Patient Intake Assessment</li>
              <li>→ Ongoing Care & Support ($395/mo)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. INSTANT STUDIO SCOPER (Precision AI Estimator) */}
      <section id="scoper" className="container max-w-6xl space-y-8">
        <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              INTERACTIVE TOOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
              Studio Scoper.
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Select Your Parameters for Instant Guidance
          </div>
        </div>
        <StudioScoper />
      </section>

      {/* 5. STUDIO PACKAGES & RATE CARD (Architectural Clean Rate Card) */}
      <section id="pricing" className="container max-w-6xl space-y-12">
        <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              PREDICTABLE INVESTMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 mt-1">
              Studio Packages & Rates.
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Transparent Pricing · No Vague Retainers or Hourly Invoices
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>01. SOLO SPECIALIST</span>
                <span>5–7 DAYS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $4,800 <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  For independent practitioners & solo specialists establishing authoritative positioning.
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Bespoke single-page luxury flagship</strong> crafted for your discipline</li>
                <li className="flex items-start gap-2">✓ <strong>Clinical copywriting</strong> written to position your authority</li>
                <li className="flex items-start gap-2">✓ <strong>Consultation booking flow</strong> integrated directly with your calendar</li>
                <li className="flex items-start gap-2">✓ <strong>Mobile-first polish</strong> flawless on iOS and Android</li>
                <li className="flex items-start gap-2">✓ <strong>Rapid 5–7 day turnaround</strong> from kickoff to live launch</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="01. Solo Specialist Launch ($4,800 AUD)"
                className="w-full block text-center py-3.5 rounded-full border border-neutral-300 text-black text-xs font-mono uppercase hover:bg-neutral-50 transition-all duration-200"
              >
                Inquire About Solo Launch →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 2 - FLAGSHIP SWEET SPOT */}
          <div className="rounded-3xl border-2 border-black bg-white p-8 sm:p-10 flex flex-col justify-between shadow-xl relative hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-[#f0ff50] text-[10px] font-mono tracking-widest uppercase font-semibold">
              The Flagship Build
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>02. BOUTIQUE CLINIC</span>
                <span>10–14 DAYS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $8,800 <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  Our premier engagement. Exactly what we designed and deployed for Dr. Jayne (Hali).
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Full multi-page editorial website</strong> for all clinical services</li>
                <li className="flex items-start gap-2">✓ <strong>Complete clinical copywriting</strong> addressing patient inquiries</li>
                <li className="flex items-start gap-2">✓ <strong>Bespoke visual identity & typography</strong> tailored to your rooms</li>
                <li className="flex items-start gap-2">✓ <strong>Interactive patient assessment</strong> and qualification flow</li>
                <li className="flex items-start gap-2">✓ <strong>Google Search Console & local presence</strong> verified</li>
                <li className="flex items-start gap-2">✓ <strong>Turnkey delivery in 10–14 days</strong> with full collaborative sign-off</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="02. Boutique Clinic Studio Build ($8,800 AUD)"
                className="w-full block text-center py-3.5 rounded-full bg-black text-[#f0ff50] text-xs font-mono uppercase hover:bg-neutral-800 transition-all duration-200 font-semibold"
              >
                Choose Boutique Clinic →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>03. FULL PRACTICE TRANSFORMATION</span>
                <span>3–4 WEEKS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $16,500+ <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  For multi-doctor clinics, scaling groups, and multi-location medical facilities.
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Multi-practitioner architecture</strong> with individual specialist profiles</li>
                <li className="flex items-start gap-2">✓ <strong>Direct practice management integration</strong> (Cliniko, Halaxy, Stripe)</li>
                <li className="flex items-start gap-2">✓ <strong>Dedicated procedural landing pages</strong> for referral & search traffic</li>
                <li className="flex items-start gap-2">✓ <strong>Multi-location practice pages</strong> tailored for regional search</li>
                <li className="flex items-start gap-2">✓ <strong>Staff-friendly content studio</strong> to manage practitioner bios & news</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="03. Complete Practice Transformation ($16,500+ AUD)"
                className="w-full block text-center py-3.5 rounded-full border border-neutral-300 text-black text-xs font-mono uppercase hover:bg-neutral-50 transition-all duration-200"
              >
                Inquire About Transformation →
              </PackageSelectButton>
            </div>
          </div>
        </div>

        {/* ONGOING CARE BANNER */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f0ff50]"></span>
              <span className="font-mono text-xs uppercase font-semibold text-neutral-700">Studio Care & Support</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-950">
              $395 AUD / month · Complete Hands-Off Protection
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              We look after your website infrastructure so you can focus 100% on patient care. Includes fast managed edge hosting, regular automated backups, security monitoring, and 2 hours per month of priority text, doctor, or treatment updates.
            </p>
          </div>
          <PackageSelectButton
            packageTier="Studio Care & Peace of Mind ($395/mo)"
            className="px-6 py-3.5 rounded-full bg-white border border-neutral-300 text-xs font-mono uppercase text-black hover:bg-neutral-100 transition-all duration-200 whitespace-nowrap"
          >
            Inquire About Studio Care →
          </PackageSelectButton>
        </div>
      </section>

      {/* 6. STUDIO PHILOSOPHY (Direct Studio vs Traditional Agency) */}
      <section id="philosophy" className="container max-w-6xl space-y-12">
        <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              THE STUDIO ETHOS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 mt-1">
              Direct Partnership vs Conventional Agency Drag.
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Simple, Yet Significant
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Agency Column */}
          <div className="p-8 sm:p-10 rounded-3xl border border-neutral-200 bg-neutral-50/70 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                01 // THE TRADITIONAL AGENCY APPROACH
              </div>
              <h3 className="text-xl font-bold text-neutral-950 leading-snug">
                Account Layers, Disconnected Writing, and Prolonged Delays
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Conventional agencies often dilute attention across account managers, coordinators, and junior freelancers without healthcare experience.
              </p>
              <ul className="space-y-3.5 text-xs text-neutral-700 pt-2 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Communication Layers:</strong> You brief an account representative who delegates to junior staff. Clinical nuances are often lost in translation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Excessive Homework:</strong> Lengthy questionnaires that expect doctors to write their own procedural copy from scratch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-400 font-mono text-sm leading-none">•</span>
                  <span><strong>Fragile Templates:</strong> Sites built on generic WordPress themes with dozens of third-party plugins that break upon updating.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500 uppercase">
              Typical Timeline: 3–6 Months · High Administrative Drag
            </div>
          </div>

          {/* MVMNT Studio Standard Column */}
          <div className="p-8 sm:p-10 rounded-3xl border-2 border-black bg-white space-y-6 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                02 // THE MVMNT STUDIO STANDARD
              </div>
              <h3 className="text-xl font-bold text-neutral-950 leading-snug">
                Direct Dialogue, Turnkey Clinical Writing, and Proven Reliability
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                We operate as a focused, disciplined boutique studio. You collaborate directly with senior designers and developers who understand the standards expected of high-end private rooms.
              </p>
              <ul className="space-y-3.5 text-xs text-neutral-700 pt-2 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Direct Partner Collaboration:</strong> Direct access to the creative and technical leads who build your site, ensuring clinical goals are executed accurately.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Structured Clinical Review:</strong> We lead the writing process through a focused 45-minute intake discussion, producing patient-friendly drafts with full clinical review.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-mono text-sm leading-none">•</span>
                  <span><strong>Modern Edge Engineering:</strong> Built with Next.js on managed global infrastructure with 99.9% uptime, automated backups, and fast mobile response times.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-black font-semibold uppercase">
              Target Delivery: 7–14 Business Days · Clear Milestones
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <FaqSection />

      {/* 8. BOOKING & INTAKE FORM */}
      <section id="booking" className="container max-w-6xl">
        <BookingForm />
      </section>
    </div>
  );
}
