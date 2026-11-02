import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';
import FaqSection from '@/app/components/FaqSection';
import PackageSelectButton from '@/app/components/PackageSelectButton';
import HeroShowreel from '@/app/components/HeroShowreel';
import { getWpProjects } from '@/lib/wordpress';

export default async function Home() {
  const projects = await getWpProjects();
  const mvmntClub = projects.find((p) => p.slug.includes('mvmnt-club')) || projects[0];
  const hali = projects.find((p) => p.slug.includes('hali')) || projects[1];
  const cartel = projects.find((p) => p.slug.includes('cartel')) || projects[2];
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
                Enduring brand identities and bespoke digital flagships.
              </h1>
            </div>

            <div className="max-w-sm space-y-4 font-sans text-sm text-neutral-600 leading-relaxed">
              <p>
                MVMNT is an independent design and digital studio in Canberra and Sydney. We partner with ambitious brands, modern companies, and specialist leaders to craft digital flagships that move hearts and accelerate commercial growth.
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
              Project Scoper
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
          <span>Digital Flagships & Platforms</span>
          <span className="text-neutral-300">/</span>
          <span>Headless Commerce Systems</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Canberra & Sydney</span>
          <span className="text-neutral-300">/</span>
          <span>High-Trust Editorial Copywriting</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Modern Edge Engineering</span>
          <span className="text-neutral-300">/</span>
          <span>5–14 Day Delivery</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Independent Studio</span>
          <span className="text-neutral-300">/</span>
          <span>Brand Identities</span>
          <span className="text-[#f0ff50] font-bold">♥</span>
          <span>Digital Flagships & Platforms</span>
        </div>
      </section>

      {/* 2. RECENT WORK (Swell Showcase Grid with Real Project Evidence) */}
      <section id="work" className="container space-y-16" data-block="work">
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
            Selected Brand Identities, Digital Flagships & Use Cases
          </div>
        </div>

        {/* WORK CARD 1: MVMNT CLUB CYCLING APPAREL & DIGITAL FLAGSHIP */}
        <article className="border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="p-8 sm:p-12 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-neutral-100 font-mono text-[10px] uppercase tracking-wider text-neutral-800 font-semibold">
                    {mvmntClub.category}
                  </span>
                  <span className="text-neutral-400 font-mono text-xs">{mvmntClub.location}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold text-neutral-950">
                  {mvmntClub.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {mvmntClub.content}
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-500 space-y-1 lg:text-right">
                <div className="text-black font-semibold">{mvmntClub.techStack}</div>
                <div>Sub-second Page Response · Zero Floating Capital</div>
              </div>
            </div>

            {/* Visual Double Frame */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-900">
                  <Image
                    src={mvmntClub.imagePrimary}
                    alt={mvmntClub.title}
                    fill
                    className="object-cover object-[center_28%] hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-neutral-600 font-mono">
                  [ Editorial Kit Visuals ] Aerodynamic apparel and premium team identity.
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-900">
                  <Image
                    src={mvmntClub.imageSecondary}
                    alt={mvmntClub.title}
                    fill
                    className="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-neutral-600 font-mono">
                  [ Peloton Platform ] Automated team pre-orders and on-demand production.
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* WORK CARD 2: HALI INSTITUTE (Featured Case Study) */}
        <article className="border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#f0ff50] font-mono text-[10px] uppercase tracking-wider text-black font-semibold">
                  Featured Use Case · Specialist Practice
                </span>
                <span className="text-neutral-400 font-mono text-xs">{hali.location}</span>
              </div>

              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1">
                  CASE STUDY: CLINICAL PRACTICE TRANSFORMATION
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight">
                  {hali.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                {hali.content}
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0ff50]"></span>
                  <span>{hali.techStack}</span>
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

              {hali.testimonialText && (
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs italic text-neutral-800 leading-relaxed font-sans">
                  &ldquo;{hali.testimonialText}&rdquo;
                  <span className="block mt-1 font-semibold not-italic font-mono text-[11px] text-neutral-900">
                    — {hali.testimonialAuthor || 'Client Testimonial'}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-[#c4b5a5]">
                <Image
                  src={hali.imagePrimary}
                  alt={hali.title}
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
                  src={hali.imageSecondary}
                  alt="Desktop View Preview"
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
                  alt="Mobile View Preview"
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

        {/* WORK CARD 3: CARTEL RACING & CANBERRA CYCLING CLUB */}
        <article className="border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="p-8 sm:p-12 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-neutral-100 font-mono text-[10px] uppercase tracking-wider text-neutral-800 font-semibold">
                    {cartel.category}
                  </span>
                  <span className="text-neutral-400 font-mono text-xs">{cartel.location}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold text-neutral-950">
                  {cartel.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {cartel.content}
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-500 space-y-1 lg:text-right">
                <div className="text-black font-semibold">{cartel.techStack}</div>
                <div>Vector Master Production · Race Ready</div>
              </div>
            </div>

            {/* Visual Double Frame */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100">
                  <Image
                    src={cartel.imagePrimary}
                    alt={cartel.title}
                    fill
                    className="object-contain p-4 hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-neutral-600 font-mono">
                  [ Cartel 2025 Kit ] Spatial apparel design and aerodynamic sponsor placement.
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100">
                  <Image
                    src={cartel.imageSecondary}
                    alt="Canberra Cycling Club Team Kit Visual"
                    fill
                    className="object-contain p-4 hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-neutral-600 font-mono">
                  [ Canberra Cycling Club ] Heritage club kit design and vector production files.
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 3. DISCIPLINES (Swell Triad: Brand, Digital, Custom Systems) */}
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
              We design brand identities, typography systems, and editorial copy that help ambitious brands and specialist leaders lead with distinct authority. Thoughtful typography, tranquil palettes, and persuasive messaging.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Visual Identity & Art Direction</li>
              <li>→ High-Trust Editorial Copywriting</li>
              <li>→ Brand Guidelines & Typography</li>
              <li>→ Category Positioning Strategy</li>
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
              Fast, reliable, and functional. Custom Next.js web applications built from concept to live deployment with sub-second page loads, fluid responsive interactions, and zero fragile template dependencies.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Modern Next.js Edge Engineering</li>
              <li>→ Sub-Second Mobile Interactions</li>
              <li>→ 99.9% Uptime & Automated Managed Backups</li>
              <li>→ Core Web Vitals Optimization</li>
            </ul>
          </div>

          {/* Discipline 3 */}
          <div className="border border-neutral-200 p-8 space-y-6 bg-white hover:border-black transition-colors">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              DISCIPLINE // 03
            </div>
            <h3 className="text-2xl font-bold text-neutral-950">
              Commerce & Custom Systems
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Turnkey platforms and automated workflows that convert visitors into clients or customers. From seamless Cliniko/Halaxy clinical booking to custom Shopify headless commerce and on-demand fulfillment.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 border-t border-neutral-100 pt-6">
              <li>→ Custom Headless Shopify Integration</li>
              <li>→ Practice Management & Booking Funnels</li>
              <li>→ Custom Portals & Customer Flows</li>
              <li>→ Ongoing Studio Care ($395/mo)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. INSTANT PROJECT STRATEGY GUIDE (Studio Scoper) */}
      <section id="scoper" className="container space-y-8">
        <div className="border-b border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              03 // PROJECT SCOPER
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 mt-1">
              Studio Scoper
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Interactive Scope & Package Recommendations for Brands, Platforms & Practices
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
                <span>01. DIGITAL LAUNCH / SOLO</span>
                <span>5–7 DAYS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $4,800 <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  For independent specialists, founders & solo practitioners establishing high-authority positioning.
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Bespoke single-page digital flagship</strong> crafted for your discipline</li>
                <li className="flex items-start gap-2">✓ <strong>High-converting editorial copy</strong> written to position your authority</li>
                <li className="flex items-start gap-2">✓ <strong>Direct inquiry / booking flow</strong> integrated directly with your calendar</li>
                <li className="flex items-start gap-2">✓ <strong>Mobile-first polish</strong> flawless on iOS and Android</li>
                <li className="flex items-start gap-2">✓ <strong>Rapid 5–7 day turnaround</strong> from kickoff to live launch</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="01. Digital Launch / Solo Specialist ($4,800 AUD)"
                className="w-full block text-center py-3.5 border border-black text-black text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
              >
                Inquire About Digital Launch →
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
                <span>02. COMPLETE BRAND & PLATFORM</span>
                <span>10–14 DAYS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $8,800 <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  Our premier studio engagement. Exactly what we designed and deployed for Hali Institute & flagship clients.
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Full multi-page editorial website</strong> for all commercial or clinical services</li>
                <li className="flex items-start gap-2">✓ <strong>Complete bespoke copywriting</strong> addressing client inquiries & hesitations</li>
                <li className="flex items-start gap-2">✓ <strong>Bespoke visual identity & typography</strong> tailored to your brand</li>
                <li className="flex items-start gap-2">✓ <strong>Interactive qualification flow</strong> or patient intake assessment</li>
                <li className="flex items-start gap-2">✓ <strong>Google Search Console & search engine indexing</strong> verified</li>
                <li className="flex items-start gap-2">✓ <strong>Turnkey delivery in 10–14 days</strong> with full collaborative sign-off</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="02. Flagship Studio Build ($8,800 AUD)"
                className="w-full block text-center py-3.5 bg-black text-[#f0ff50] text-xs font-mono uppercase hover:bg-neutral-800 transition-colors font-semibold"
              >
                Choose Flagship Build →
              </PackageSelectButton>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="border border-neutral-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-black transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>03. ENTERPRISE & CUSTOM SYSTEMS</span>
                <span>3–4 WEEKS</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-950">
                  $16,500+ <span className="text-xs font-mono font-normal text-neutral-500">AUD</span>
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-sans">
                  For multi-stakeholder organizations, scaling brands, headless commerce, or multi-location groups.
                </div>
              </div>
              <ul className="space-y-3 text-xs text-neutral-700 font-sans border-t border-neutral-100 pt-6">
                <li className="flex items-start gap-2">✓ <strong>Complex digital architecture</strong> with multi-profile or multi-location hierarchy</li>
                <li className="flex items-start gap-2">✓ <strong>Direct integration with commerce or practice management</strong> (Shopify, Cliniko, Stripe)</li>
                <li className="flex items-start gap-2">✓ <strong>Dedicated procedural or product landing pages</strong> for marketing campaigns</li>
                <li className="flex items-start gap-2">✓ <strong>High-conversion acquisition funnels</strong> tailored for paid and organic search</li>
                <li className="flex items-start gap-2">✓ <strong>Staff-friendly content studio</strong> (Sanity CMS) to manage news, bios, and products</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-neutral-100">
              <PackageSelectButton
                packageTier="03. Enterprise & Custom Systems ($16,500+ AUD)"
                className="w-full block text-center py-3.5 border border-black text-black text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors"
              >
                Inquire About Enterprise →
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
              We look after your website infrastructure so you can focus 100% on growing your business or caring for clients. Includes fast managed edge hosting, regular automated backups, security monitoring, and 2 hours per month of priority text, team, or service updates.
            </p>
          </div>
          <PackageSelectButton
            packageTier="Studio Care & Support ($395/mo)"
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
                Conventional agencies often dilute attention across account managers, coordinators, and junior freelancers without technical or sector expertise.
              </p>
              <ul className="space-y-3 text-xs text-neutral-700 pt-2 font-sans">
                <li>• <strong>Communication Layers:</strong> Nuance is lost in translation between account managers and outsourced contractors.</li>
                <li>• <strong>Excessive Homework:</strong> Lengthy questionnaires that expect clients to write their own promotional copy from scratch.</li>
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
                Direct Dialogue, Turnkey Editorial Writing, and Proven Reliability
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                We operate as a focused, disciplined boutique studio. You collaborate directly with senior designers and engineers who understand the standards expected of high-end brands and consulting rooms.
              </p>
              <ul className="space-y-3 text-xs text-neutral-700 pt-2 font-sans">
                <li>• <strong>Direct Partner Collaboration:</strong> Direct access to the creative and technical leads who build your platform.</li>
                <li>• <strong>Turnkey Editorial Copywriting:</strong> We lead the writing process through a focused 45-minute intake discussion.</li>
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
