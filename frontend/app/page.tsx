import Image from 'next/image';
import Link from 'next/link';
import StudioScoper from '@/app/components/StudioScoper';
import BookingForm from '@/app/components/BookingForm';

export default function Home() {
  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* 1. HERO SECTION */}
      <section className="container max-w-5xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>AUTONOMOUS DIGITAL ARCHITECTURE · SYDNEY & MELBOURNE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[1.08]">
          Digital Architecture That Outclasses 99% of Agencies.
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 font-light leading-relaxed">
          Custom editorial typography, sub-150ms edge infrastructure, clinical copy refinement, and zero bloated plugins. Engineered for practice leaders, independent specialists, and high-ticket service brands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#scoper"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            Scope Your Project in Real Time
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gray-300 text-black text-sm font-medium hover:bg-gray-50 transition"
          >
            View Fixed Pricing Tiers
          </a>
        </div>

        {/* Real Proof Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gray-200 text-left font-mono">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-2xl font-bold text-gray-950">&lt; 150ms</div>
            <div className="text-xs text-gray-500 mt-1">Average Edge TTFB</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-2xl font-bold text-gray-950">100 / 100</div>
            <div className="text-xs text-gray-500 mt-1">Core Web Vitals</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-2xl font-bold text-gray-950">5–14 Days</div>
            <div className="text-xs text-gray-500 mt-1">Production Turnaround</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-2xl font-bold text-gray-950">0 Plugins</div>
            <div className="text-xs text-gray-500 mt-1">Zero Security Vulnerabilities</div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME AI SCOPER SECTION */}
      <section className="container max-w-5xl">
        <StudioScoper />
      </section>

      {/* 3. CASE STUDY BENCHMARK: HALI INSTITUTE (JAYNE'S SITE) */}
      <section id="casestudy" className="container max-w-5xl space-y-12">
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
              Live Case Study Benchmark
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mt-1">
              Hali Institute of Restorative Medicine
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-500">
            Delivered in 7 Days · $8,800 Commercial Studio Tier
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
              Replacing 4-Month Agency Bloat with Editorial Clinical Craft.
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Dr. Jayne needed an elevated clinical platform for high-ticket restorative consultations. Conventional agency proposals requested $14,000+ AUD and 12–16 weeks for a sluggish WordPress template.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              We architected a custom edge solution with warm architectural neutrals, bespoke clinical typography, 100% WCAG AAA contrast, and interactive patient self-assessment funnels that load in under 100ms.
            </p>
            
            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span><strong>Architecture:</strong> Zero-dependency edge static with sub-second Vercel delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span><strong>Typography:</strong> Custom editorial serif hierarchy + clean tabular numerals</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span><strong>QA Validation:</strong> 100% pass across 5 mobile viewports with 0px horizontal overflow</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100">
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
                alt="Hali Institute Desktop UI"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="font-mono text-xs text-gray-500">
              Desktop Architectural Grid · Custom Navigation & Intake Triggers
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4 space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/images/hali_case_study_menu.png"
                alt="Hali Institute Mobile Navigation"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="font-mono text-xs text-gray-500">
              Mobile Interaction Architecture · Zero Horizontal Drift
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTIZED PRICING PACKAGES */}
      <section id="pricing" className="container max-w-5xl space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Predictable Investment · Zero Surprises
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950">
            Productized Studio Packages.
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Transparent pricing based on high-craft delivery sprints. No bloated retainer contracts, no hourly rate padding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>01. SPRINT LAUNCH</span>
                <span>5–7 DAYS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$4,800 <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-500 mt-1">Introductory rate for solo specialists & consultants.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700 font-mono">
                <li className="flex items-center gap-2">✓ Bespoke single-page architecture</li>
                <li className="flex items-center gap-2">✓ Sub-150ms mobile page speed</li>
                <li className="flex items-center gap-2">✓ Lead capture & booking integration</li>
                <li className="flex items-center gap-2">✓ Automated SSL & edge DNS setup</li>
                <li className="flex items-center gap-2">✓ 100% WCAG AAA accessibility</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition"
              >
                Select Sprint Launch
              </a>
            </div>
          </div>

          {/* TIER 2 - FEATURED SWEET SPOT */}
          <div className="rounded-2xl border-2 border-black bg-white p-8 flex flex-col justify-between shadow-lg relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-white text-[10px] font-mono tracking-widest uppercase font-semibold">
              The Commercial Sweet Spot
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>02. STUDIO BUILD</span>
                <span>10–14 DAYS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$8,800 <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-500 mt-1">True market value. Exactly what was built for Jayne (Hali).</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700 font-mono">
                <li className="flex items-center gap-2">✓ Full multi-page editorial architecture</li>
                <li className="flex items-center gap-2">✓ Clinical copywriting & positioning refinement</li>
                <li className="flex items-center gap-2">✓ Custom typography licensing integration</li>
                <li className="flex items-center gap-2">✓ Interactive patient/client assessment flow</li>
                <li className="flex items-center gap-2">✓ Google Search Console & Schema SEO</li>
                <li className="flex items-center gap-2">✓ Rigorous 5-viewport QA automated testing</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3 rounded-full bg-black text-white text-xs font-mono uppercase hover:bg-gray-800 transition"
              >
                Select Studio Build →
              </a>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-gray-500">
                <span>03. CUSTOM ARCHITECTURE</span>
                <span>3–4 WEEKS</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-950">$16,500+ <span className="text-xs font-normal text-gray-500">AUD</span></div>
                <div className="text-xs text-gray-500 mt-1">Multi-location practices, paid traffic & web portals.</div>
              </div>
              <ul className="space-y-3 text-xs text-gray-700 font-mono">
                <li className="flex items-center gap-2">✓ Full Sanity headless CMS integration</li>
                <li className="flex items-center gap-2">✓ Practice management EHR API (Cliniko/Halaxy)</li>
                <li className="flex items-center gap-2">✓ Custom Stripe deposit checkout flows</li>
                <li className="flex items-center gap-2">✓ Multi-location local landing funnels</li>
                <li className="flex items-center gap-2">✓ Google Ads & Meta Ads tracking infrastructure</li>
              </ul>
            </div>
            <div className="pt-8 mt-8 border-t border-gray-100">
              <a
                href="#booking"
                className="w-full block text-center py-3 rounded-full border border-gray-300 text-black text-xs font-mono uppercase hover:bg-gray-50 transition"
              >
                Select Custom Scope
              </a>
            </div>
          </div>
        </div>

        {/* ONGOING CARE BANNER */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-mono text-xs uppercase font-semibold text-gray-700">Studio Care & Continuous Edge Retainer</span>
            </div>
            <h3 className="text-xl font-bold text-gray-950">
              $395 AUD / month · Complete Hands-Off Protection
            </h3>
            <p className="text-xs text-gray-600 max-w-xl">
              Includes ultra-fast global edge hosting, continuous uptime monitoring, SSL renewals, automated weekly snapshots, and 2 hours per month of priority design & copy adjustments.
            </p>
          </div>
          <a
            href="#booking"
            className="px-6 py-3 rounded-full bg-white border border-gray-300 text-xs font-mono uppercase text-black hover:bg-gray-100 transition whitespace-nowrap"
          >
            Inquire About Studio Care
          </a>
        </div>
      </section>

      {/* 5. ARCHITECTURE PHILOSOPHY */}
      <section id="architecture" className="container max-w-5xl space-y-8">
        <div className="border-b border-gray-200 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Engineering Standard
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-950 mt-1">
            Why We Reject Agency Fluff.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">01. Weightless Performance</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              Most agency websites load 45 tracking scripts and 30 plugins before rendering a single word. Our platforms are hand-crafted on Next.js 16 and Vercel edge networks, rendering fully in under 150 milliseconds.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">02. Authentic Editorial Voice</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              We do not generate AI slop or generic corporate filler. Every sentence is written to establish high clinical trust, address patient objections, and guide visitors toward clear booking actions.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-3">
            <span className="text-base font-bold text-black block">03. Headless Content Freedom</span>
            <p className="text-gray-600 leading-relaxed font-sans text-sm">
              Powered by Sanity CMS, giving you a beautiful editorial studio to update services, publish journal articles, and manage media without ever breaking the underlying production code.
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
