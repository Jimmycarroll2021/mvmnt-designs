import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-mono text-sm font-bold tracking-tighter">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-gray-950 font-mono">
              MVMNT STUDIO
            </span>
            <span className="text-[10px] tracking-widest uppercase text-gray-500 font-mono">
              Bespoke Digital Architecture
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-gray-600">
          <Link href="#scoper" className="hover:text-black transition">
            AI Scoper
          </Link>
          <Link href="#casestudy" className="hover:text-black transition">
            Case Study
          </Link>
          <Link href="#pricing" className="hover:text-black transition">
            Pricing
          </Link>
          <Link href="#architecture" className="hover:text-black transition">
            Architecture
          </Link>
          <Link href="/studio" className="hover:text-black transition text-gray-400">
            Sanity CMS
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#booking"
            className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono tracking-wider uppercase hover:bg-gray-800 transition"
          >
            Book Discovery
          </Link>
        </div>
      </div>
    </header>
  );
}
