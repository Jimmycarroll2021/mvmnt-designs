import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-16 text-xs text-gray-600 font-mono">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-black tracking-tight text-sm">MVMNT STUDIO</span>
            <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-[10px]">AUSTRALIA</span>
          </div>
          <p className="max-w-md text-gray-500 leading-relaxed">
            High-performance digital architecture, clinical copywriting, and edge infrastructure engineered specifically for independent specialists, established practices, and high-ticket service brands.
          </p>
          <div className="text-[11px] text-gray-400">
            Based in Sydney & Melbourne, Australia · Direct Studio Operations · Sub-150ms TTFB
          </div>
        </div>

        <div>
          <span className="block text-gray-900 font-semibold mb-3 tracking-wider uppercase text-[11px]">
            Productized Services
          </span>
          <ul className="space-y-2">
            <li><Link href="#pricing" className="hover:text-black">01. Sprint Launch ($4,800)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">02. Studio Build ($8,800)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">03. Custom Architecture ($16,500+)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">Studio Care & Retainer ($395/mo)</Link></li>
          </ul>
        </div>

        <div>
          <span className="block text-gray-900 font-semibold mb-3 tracking-wider uppercase text-[11px]">
            Infrastructure & Stack
          </span>
          <ul className="space-y-2">
            <li><Link href="#scoper" className="hover:text-black">Vercel AI SDK Scoper</Link></li>
            <li><Link href="/studio" className="hover:text-black">Sanity Studio (CMS)</Link></li>
            <li><a href="https://github.com/Jimmycarroll2021/mvmnt-designs" target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub Repository ↗</a></li>
            <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-black">Next.js 16 + React 19</a></li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-[11px]">
        <div>
          © {new Date().getFullYear()} MVMNT Designs Pty Ltd. Handcrafted in Australia.
        </div>
        <div className="flex gap-6">
          <span>100% WCAG AAA Compliant</span>
          <span>Zero Legacy CMS Overhead</span>
          <span>Edge Accelerated</span>
        </div>
      </div>
    </footer>
  );
}
