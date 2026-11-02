import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';
import FaqSection from '@/app/components/FaqSection';
import PackageSelectButton from '@/app/components/PackageSelectButton';
import HeroShowreel from '@/app/components/HeroShowreel';

export default function Home() {
  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      {/* 1. HERO SECTION (Swell-Calibre Monumental Grotesque Opening) */}
      <section className="container pt-6 sm:pt-10">
        <div className="border-b border-black pb-12 sm:pb-16 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-[#f0ff50] ring-4 ring-[#f0ff50]/20"></span>
                <span>MVMNT STUDIO // CANBERRA & SYDNEY · AUSTRALIA</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-black leading-[1.02]">
                Bespoke digital design for private practices and ambitious brands.
              </h1>
            </div>

            <div className="max-w-sm space-y-4 font-sans text-sm text-neutral-600 leading-relaxed">
              <p>
                We build high-trust digital flagships, clinical copywriting, and frictionless patient booking systems. Built for doctors, specialists, and leaders who want to be recognised as premier authorities in their field.
              </p>
              <div className="font-mono text-xs uppercase tracking-wider text-black flex items-center gap-2 pt-2">
                <span className="text-neutral-400">→</span>
                <span>Direct Partner Collaboration · 5–14 Day Turnaround</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs uppercase tracking-wider">
            <a
              href="#work"
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#f0ff50] hover:text-black transition-colors"
            >
              Recent Work ↓
            </a>
            <a
              href="#pricing"
              className="px-5 py-2.5 rounded-full border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
            >
              Studio Packages & Rates
            </a>
            <a
              href="#scoper"
              className="px-5 py-2.5 rounded-full border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
            >
              Instant Strategy Guide
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
            >
              Request 15-Min Call
            </a>
          </div>
        </div>

        {/* Visual Showreel Stage */}
        <div className="pt-10">
          <HeroShowreel />
        </div>
      </section>

      {/* CONTINUOUS MARQUEE STRIP */}
      <section className="w-full overflow-hidden border-y border-black bg-neutral-50 py-3.5 select-none font-mono text-xs uppercase tracking-widest text-neutral-600">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          <span>Brand Identities</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Medical Specialists & Private Rooms</span>
          <span className="text-neutral-300">/</span>
          <span>High-Performance Digital Flagships</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Canberra & Sydney</span>
          <span className="text-neutral-300">/</span>
          <span>AHPRA-Aware Clinical Copywriting</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Effortless Mobile Booking Journeys</span>
          <span className="text-neutral-300">/</span>
          <span>5–14 Day Delivery</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Next.js Edge Architecture</span>
          <span className="text-neutral-300">/</span>
          <span>Brand Identities</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Medical Specialists & Private Rooms</span>
        </div>
      </section>

      {/* 2. RECENT WORK (Swell Showcase Grid with Real Project Evidence) */}
      <section id="work" className="container space-y-12" data-block="work">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              01 // PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Recent Work
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Selected Digital Flagships & Clinical Environments
          </div>
        </div>

        {/* WORK CARD 1: HALI INSTITUTE (Major Case Study) */}
        <article className="border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-neutral-100 font-mono text-[10px] uppercase tracking-wider text-neutral-800 font-semibold">
                  Brand · Digital · Clinical Experience
                </span>
                <span className="text-neutral-400 font-mono text-xs">Canberra, ACT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight">
                Hali Institute of Restorative Medicine
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Elevating a specialist practice in Canberra to match the calibre of her care. Dr. Jayne offers restorative medical therapies and evidence-based protocols. We replaced generic medical stock graphics with high-readability editorial typography and tranquil tones mirroring her physical consulting rooms.
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
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-[#c4b5a5]">
                <Image
                  src="/images/hali_case_study_cover.png"
                  alt="Hali Institute Case Study Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Visual Gallery Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-200">
            <div className="p-8 border-b md:border-b-0 md:border-r border-neutral-200 space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100">
                <Image
                  src="/images/hali_case_study_hero.png"
                  alt="Hali Desktop View"
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                [ Desktop Presentation ] Clear clinical hierarchy and direct consultation pathways.
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100">
                <Image
                  src="/images/hali_case_study_menu.png"
                  alt="Hali Mobile View"
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                [ Mobile Polish ] Streamlined navigation designed for busy patients booking on phones.
              </div>
            </div>
          </div>
        </article>

        {/* WORK CARD 2: MVMNT CLUB CYCLING APPAREL */}
        <article className="border border-neutral-200 bg-white p-8 sm:p-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-neutral-100 font-mono text-[10px] uppercase tracking-wider text-neutral-800 font-semibold">
                  Digital Flagship · Headless Commerce · Sport
                </span>
                <span className="text-neutral-400 font-mono text-xs">Australia</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
                MVMNT Club Custom Apparel Engine
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Headless high-performance custom kit engine for Australian cycling clubs. Standardising 3D kit visualization, sizing, and automated on-demand Shopify fulfillment without club financial float.
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-500 space-y-1">
              <div>Next.js Edge + Shopify Admin GraphQL</div>
              <div>Sub-second Page Response</div>
            </div>
          </div>
        </article>
      </section>

      {/* 3. DISCIPLINES (Swell Triad: Brand, Digital, Spatial) */}
      <section id="disciplines" className="container space-y-12">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              02 // EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Disciplines
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Strategy, Design & Modern Engineering
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Discipline 1 */}
          <div className="border border-neutral-200 p-8 space-y-6 bg-white hover:border-black transition-colors">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              DISCIPLINE // 01
            </div>
            <h3 className="text-2xl font-bold text-neutral-950">
              Brand & Positioning
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              We design brand identities and write clinical copy that help ambitious practices lead with distinct authority. Thoughtful typography, tranquil palettes, and persuasive messaging that reassure anxious patients.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Visual Identity & Art Direction</li>
              <li>→ Clinical & Commercial Copywriting</li>
              <li>→ AHPRA-Aware Practice Guides</li>
              <li>→ Brand Guidelines & Typography</li>
            </ul>
          </div>

          {/* Discipline 2 */}
          <div className="border border-neutral-200 p-8 space-y-6 bg-white hover:border-black transition-colors">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              DISCIPLINE // 02
            </div>
            <h3 className="text-2xl font-bold text-neutral-950">
              Digital Flagships
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Fast, reliable, and functional. Custom Next.js web platforms built from concept to live deployment with sub-second page loads, fluid responsive interactions, and zero fragile template dependencies.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Modern Next.js Edge Development</li>
              <li>→ Sub-Second Mobile Interactions</li>
              <li>→ 99.9% Uptime & Automated Backups</li>
              <li>→ Core Web Vitals Optimization</li>
            </ul>
          </div>

          {/* Discipline 3 */}
          <div className="border border-neutral-200 p-8 space-y-6 bg-white hover:border-black transition-colors">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              DISCIPLINE // 03
            </div>
            <h3 className="text-2xl font-bold text-neutral-950">
              Clinic & Booking Systems
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Turnkey appointment funnels that convert visitors into booked consultations. Seamless integration with Cliniko, Halaxy, Stripe, and modern clinic software without losing visitors to jarring redirects.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Direct Practice Software Integration</li>
              <li>→ Multi-Practitioner Directories</li>
              <li>→ Secure Patient Intake Assessment</li>
              <li>→ Ongoing Care & Support ($395/mo)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. INSTANT PRACTICE STRATEGY GUIDE (Studio Scoper) */}
      <section id="scoper" className="container space-y-8">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              03 // STRATEGY GUIDE
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Studio Scoper
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Interactive Practice Scope & Package Recommendations
          </div>
        </div>

        <StudioScoper />
      </section>

      {/* 5. PACKAGES & TRANSPARENT RATES (Swell Architectural Rate Card) */}
      <section id="pricing" className="container space-y-12">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              04 // TRANSPARENT INVESTMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Studio Packages & Rates
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Fixed Pricing · Clear Inclusions · No Vague Hourly Retainers
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1 */}
          <div className="border border-neutral-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-black transition-colors">
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
                className="w-full block text-center py-3.5 border border-black text-black text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
              >
                Inquire About Solo Launch →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 2 - FLAGSHIP */}
          <div className="border-2 border-black bg-white p-8 sm:p-10 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3 left-8 px-3 py-0.5 bg-black text-[#f0ff50] text-[10px] font-mono tracking-widest uppercase font-semibold">
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
                className="w-full block text-center py-3.5 bg-black text-[#f0ff50] text-xs font-mono uppercase hover:bg-neutral-800 transition-colors font-semibold"
              >
                Choose Boutique Clinic →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="border border-neutral-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-black transition-colors">
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
                className="w-full block text-center py-3.5 border border-black text-black text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
              >
                Inquire About Transformation →
              </PackageSelectButton>
            </div>
          </div>
        </div>

        {/* ONGOING CARE BANNER */}
        <div className="border border-neutral-200 bg-neutral-50 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f0ff50]"></span>
              <span className="font-mono text-xs uppercase font-semibold text-neutral-800">Studio Care & Support</span>
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
            className="px-6 py-3.5 border border-black text-xs font-mono uppercase text-black hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            Inquire About Studio Care →
          </PackageSelectButton>
        </div>
      </section>

      {/* 6. STUDIO PHILOSOPHY (Direct Collaboration vs Agency Drag) */}
      <section id="philosophy" className="container space-y-12">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              05 // PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Direct Partnership vs Conventional Agency Drag
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Disciplined Craft · Senior Leads
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Agency Column */}
          <div className="p-8 sm:p-10 border border-neutral-200 bg-neutral-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                THE TRADITIONAL AGENCY APPROACH
              </div>
              <h3 className="text-xl font-bold text-neutral-950 leading-snug">
                Account Layers, Disconnected Writing, and Prolonged Delays
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Conventional agencies often dilute attention across account managers, coordinators, and junior freelancers without healthcare experience.
              </p>
              <ul className="space-y-3 text-xs text-neutral-700 pt-2 font-sans">
                <li>• <strong>Communication Layers:</strong> Clinical nuances are lost in translation between account managers and outsourced teams.</li>
                <li>• <strong>Excessive Homework:</strong> Lengthy questionnaires that expect doctors to write their own procedural copy from scratch.</li>
                <li>• <strong>Fragile Templates:</strong> Sites built on generic WordPress themes with dozens of third-party plugins that break upon updating.</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500 uppercase">
              Typical Timeline: 3–6 Months · High Administrative Drag
            </div>
          </div>

          {/* MVMNT Studio Standard Column */}
          <div className="p-8 sm:p-10 border-2 border-black bg-white space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-black font-semibold">
                THE MVMNT STUDIO STANDARD
              </div>
              <h3 className="text-xl font-bold text-neutral-950 leading-snug">
                Direct Dialogue, Turnkey Clinical Writing, and Proven Reliability
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                We operate as a focused, disciplined boutique studio. You collaborate directly with senior designers and developers who understand the standards expected of high-end private rooms.
              </p>
              <ul className="space-y-3 text-xs text-neutral-700 pt-2 font-sans">
                <li>• <strong>Direct Partner Collaboration:</strong> Direct access to the creative and technical leads who build your site.</li>
                <li>• <strong>Structured Clinical Review:</strong> We lead the writing process through a focused 45-minute intake discussion.</li>
                <li>• <strong>Modern Edge Engineering:</strong> Built with Next.js on managed global infrastructure with 99.9% uptime and sub-second page loads.</li>
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

      {/* 8. CONTACT & INTAKE (Swell 2-Column Minimalist Format) */}
      <section id="contact" className="container space-y-12">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              06 // INITIATE A PROJECT
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Contact & Strategy Call
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            hello@mvmnt-designs.vercel.app · Canberra ACT
          </div>
        </div>

        <BookingForm />
      </section>
    </div>
  );
}
