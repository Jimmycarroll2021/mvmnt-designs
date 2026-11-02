import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroShowreel from '@/app/components/HeroShowreel';
import BookingForm from '@/app/components/BookingForm';
import StudioScoper from '@/app/components/StudioScoper';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  bgColor: string;
  imageSrc?: string;
  tag?: string;
}

const RECENT_WORK: WorkItem[] = [
  {
    id: 'hali',
    title: 'Hali Institute',
    category: 'Brand, Restorative Medicine, Clinical Architecture',
    bgColor: '#b8a99a',
    imageSrc: '/images/hali_case_study_cover.png',
  },
  {
    id: 'mvmnt-club',
    title: 'MVMNT Club',
    category: 'Digital Flagship, Headless Commerce, Sport',
    bgColor: '#171717',
    imageSrc: '/images/hali_case_study_hero.png',
  },
  {
    id: 'kingston-suite',
    title: 'The Kingston Suite',
    category: 'Spatial, Brand, Wayfinding · Canberra',
    bgColor: '#2a3b4c',
    imageSrc: '/images/hali_case_study_menu.png',
  },
  {
    id: 'canberra-restorative',
    title: 'Canberra Restorative',
    category: 'Brand, Digital, Clinical Experience',
    bgColor: '#3f4e43',
    imageSrc: '/images/hali_case_study_cover.png',
  },
  {
    id: 'aero-lab',
    title: 'Aero Performance Lab',
    category: 'Digital, Product Engineering, Apparel',
    bgColor: '#303030',
    imageSrc: '/images/hali_case_study_hero.png',
  },
  {
    id: 'foreshore-health',
    title: 'Foreshore Health',
    category: 'Mobile Architecture, Patient Intake',
    bgColor: '#7a5a4c',
    imageSrc: '/images/hali_case_study_menu.png',
  },
];

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      {/* 1. SWELL SHOWREEL HERO (Zero Marketing Fluff, Pure Editorial Visuals) */}
      <h1 className="sr-only">Home — MVMNT</h1>
      <HeroShowreel />

      {/* 2. RECENT WORK (Swell Grid Architecture) */}
      <section id="work" className="container" data-block="work">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
            Recent Work
          </h2>
        </header>

        <div className="grid grid-cols-6 gap-x-4 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {RECENT_WORK.map((item) => (
            <div key={item.id} className="col-span-6 lg:col-span-6 2xl:col-span-4">
              <article className="group/card">
                <a href="#contact" className="block group">
                  {/* Media Wrapper with Solid Swell Accent Background */}
                  <div
                    className="w-full relative overflow-hidden transition-opacity duration-300 group-hover:opacity-95"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <div className="relative aspect-[0.92] w-full overflow-hidden flex items-center justify-center p-6 sm:p-8">
                      {item.imageSrc && (
                        <div className="relative w-full h-full shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata below media (Exact Swell Typography) */}
                  <div className="mt-4 space-y-1">
                    <h3 className="text-base sm:text-lg font-medium text-neutral-950 group-hover:text-neutral-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 font-sans">
                      {item.category}
                    </p>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LATEST (Swell's Editorial Work-in-Progress & Journal) */}
      <section className="container space-y-8" data-block="latest">
        <header>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
            Latest
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Latest 1 */}
          <article className="flex flex-col gap-y-6 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src="/images/hali_case_study_cover.png"
                alt="Hali Institute"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 prose pr-4">
              <h3 className="text-base uppercase tracking-wider font-medium text-neutral-950">
                Hali Institute of Restorative Medicine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Work in progress for Dr. Jayne’s specialist rooms in Canberra. We replaced generic medical stock graphics with high-readability editorial typography and tranquil tones mirroring her physical practice.
              </p>
              <p>
                <a
                  href="#contact"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-900 underline hover:text-neutral-500 transition-colors"
                >
                  View Case Study →
                </a>
              </p>
            </div>
          </article>

          {/* Latest 2 */}
          <article className="flex flex-col gap-y-6 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src="/images/hali_case_study_hero.png"
                alt="MVMNT Club Kit Engine"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 prose pr-4">
              <h3 className="text-base uppercase tracking-wider font-medium text-neutral-950">
                MVMNT Club Custom Apparel Engine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                We engineered a headless custom apparel platform for Australian cycling clubs, standardising 3D kit visualization, sizing, and automated on-demand Shopify fulfillment without club financial float.
              </p>
              <p>
                <a
                  href="#contact"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-900 underline hover:text-neutral-500 transition-colors"
                >
                  Visit Platform →
                </a>
              </p>
            </div>
          </article>

          {/* Latest 3 */}
          <article className="flex flex-col gap-y-6 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src="/images/hali_case_study_menu.png"
                alt="Wayfinding & Mobile Intake"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 prose pr-4">
              <h3 className="text-base uppercase tracking-wider font-medium text-neutral-950">
                Private Specialist Mobile Intake
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Developing an intuitive mobile intake and scheduling architecture for Canberra specialist consulting rooms. Standardising typography, iconography, and booking handoffs to eliminate patient friction.
              </p>
              <p>
                <a
                  href="#contact"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-900 underline hover:text-neutral-500 transition-colors"
                >
                  Read Architecture Note →
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 4. EXPLORE (Swell's Giant Typographic Discipline List) */}
      <nav id="disciplines" className="container py-8 border-t border-neutral-200">
        <div className="space-y-6">
          <h2 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
            Explore
          </h2>
          <div className="flex flex-col space-y-4">
            <Link
              href="#contact"
              className="group block text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 hover:text-neutral-400 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <span>Brand</span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Identities & Clinical Copywriting →
                </span>
              </div>
            </Link>
            <Link
              href="#contact"
              className="group block text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 hover:text-neutral-400 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <span>Digital</span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Next.js Edge Flagships & Speed →
                </span>
              </div>
            </Link>
            <Link
              href="#contact"
              className="group block text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 hover:text-neutral-400 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <span>Spatial & Clinical</span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Turnkey Private Practice Platforms →
                </span>
              </div>
            </Link>
            <Link
              href="#studio"
              className="group block text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 hover:text-neutral-400 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <span>Studio</span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Canberra · Sydney · Ethos →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* 5. STUDIO ETHOS (Swell's "Simple, yet significant" Manifesto) */}
      <section id="studio" className="container border-t border-neutral-200 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              Studio
            </span>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <p className="text-xl sm:text-3xl font-normal text-neutral-900 leading-snug">
              MVMNT brings brand identity, digital engineering, and clinical strategy together to move hearts and inspire minds. Our ethos continues to centre on <span className="font-medium text-black">simple, yet significant</span>.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-2xl">
              Based in Australia, we partner with ambitious private practitioners, medical specialists, and organisations across every stage of growth. We believe in direct collaboration with senior creatives, modern Next.js edge engineering, and rapid 5–14 day turnkey delivery without traditional agency drag.
            </p>
          </div>
        </div>
      </section>

      {/* 6. STUDIO SCOPER & RATES (Clean Architectural Tooling) */}
      <section className="container border-t border-neutral-200 pt-16">
        <details className="group border border-neutral-200 rounded-none bg-neutral-50 p-6 sm:p-8 cursor-pointer">
          <summary className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-950 font-semibold list-none select-none">
            <span>+ Open Studio Scoper & Practice Calculator</span>
            <span className="text-neutral-400 group-open:rotate-45 transition-transform duration-200 text-base">
              +
            </span>
          </summary>
          <div className="mt-8 pt-6 border-t border-neutral-200 cursor-auto">
            <StudioScoper />
          </div>
        </details>
      </section>

      {/* 7. CONTACT (Swell's 2-Column Minimalist Layout) */}
      <section id="contact" className="container border-t border-neutral-200 pt-16" data-block="contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              Contact
            </span>
            <p className="text-xl sm:text-2xl font-normal text-neutral-900 leading-relaxed">
              Let’s work together to build lasting value for your business. We’d love to hear from you.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  New Business
                </h3>
                <p className="text-sm text-neutral-900">
                  <a
                    href="mailto:hello@mvmnt-designs.vercel.app"
                    className="underline hover:text-neutral-500 transition-colors"
                  >
                    hello@mvmnt-designs.vercel.app
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Studio Locations
                </h3>
                <p className="text-sm text-neutral-900">
                  Canberra, ACT · Australia<br />
                  Sydney, NSW · Australia
                </p>
              </div>
            </div>

            {/* Direct Consultation Request Form */}
            <div className="pt-8 border-t border-neutral-100">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
