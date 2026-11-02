import Link from 'next/link';
import WorldClocks from './WorldClocks';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-400 py-20 text-xs font-mono">
      <div className="container space-y-16">
        {/* Main 4-column studio grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-neutral-300">
          {/* Brand Manifesto & Location */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white tracking-tight text-lg font-sans">
                MVMNT STUDIO
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-800 text-[#f0ff50] text-[10px] uppercase tracking-widest">
                CBR · SYD
              </span>
            </div>
            <p className="max-w-md text-neutral-400 font-sans text-sm leading-relaxed">
              We shape ambitious brands and digital flagships that define their category. Simple, yet significant. From high-calibre digital flagships to bespoke private practice platforms.
            </p>
            <div className="pt-2 text-neutral-500 text-[11px] leading-relaxed">
              Direct Senior Partnership · Modern Edge Engineering · Turnkey Delivery
            </div>
          </div>

          {/* Disciplines */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-white font-semibold tracking-wider uppercase text-[11px]">
              Disciplines
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#disciplines" className="hover:text-[#f0ff50] transition-colors">
                  01. Brand & Identity
                </Link>
              </li>
              <li>
                <Link href="#disciplines" className="hover:text-[#f0ff50] transition-colors">
                  02. Digital Flagships
                </Link>
              </li>
              <li>
                <Link href="#disciplines" className="hover:text-[#f0ff50] transition-colors">
                  03. Clinic Platforms
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#f0ff50] transition-colors">
                  04. Studio Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Navigation */}
          <div className="md:col-span-2 space-y-3">
            <span className="block text-white font-semibold tracking-wider uppercase text-[11px]">
              Studio
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#work" className="hover:text-[#f0ff50] transition-colors">
                  Recent Work
                </Link>
              </li>
              <li>
                <Link href="#scoper" className="hover:text-[#f0ff50] transition-colors">
                  Studio Scoper
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#f0ff50] transition-colors">
                  Packages & Rates
                </Link>
              </li>
              <li>
                <Link href="#philosophy" className="hover:text-[#f0ff50] transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="#booking" className="hover:text-[#f0ff50] transition-colors">
                  Request Call
                </Link>
              </li>
            </ul>
          </div>

          {/* New Business & Studio Contact */}
          <div className="md:col-span-3 space-y-3">
            <span className="block text-white font-semibold tracking-wider uppercase text-[11px]">
              Contact
            </span>
            <div className="space-y-1 text-sm font-sans text-neutral-300">
              <div>hello@mvmnt-designs.vercel.app</div>
              <div className="text-neutral-500 font-mono text-xs">Canberra, ACT · Australia</div>
            </div>
            <div className="pt-3">
              <Link
                href="#booking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 text-white text-[11px] font-mono uppercase hover:border-[#f0ff50] hover:text-[#f0ff50] transition-colors"
              >
                <span>Initiate Brief</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Swell-style Digital World Clocks */}
        <div className="pt-8 border-t border-neutral-900 space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">
            Studio Operating Zones & Live Clocks
          </div>
          <WorldClocks />
        </div>

        {/* Acknowledgment of Country & Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-neutral-500">
          <p className="max-w-2xl leading-relaxed">
            We acknowledge Aboriginal and Torres Strait Islander peoples as the traditional custodians of country throughout Australia. We pay our respects to their elders past, present, and emerging.
          </p>
          <div className="whitespace-nowrap text-neutral-400">
            © {new Date().getFullYear()} MVMNT Studio. Simple, yet significant.
          </div>
        </div>
      </div>
    </footer>
  );
}
