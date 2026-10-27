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
          <p className="max-w-md text-gray-500 leading-relaxed font-sans text-sm">
            We design elevated, high-converting websites and write patient-centered copy for private practices, medical specialists, and boutique high-ticket service firms.
          </p>
          <div className="text-[11px] text-gray-400">
            Based in Sydney & Melbourne, Australia · Direct Studio Partnership · Full Turnkey Delivery
          </div>
        </div>

        <div>
          <span className="block text-gray-900 font-semibold mb-3 tracking-wider uppercase text-[11px]">
            Studio Packages
          </span>
          <ul className="space-y-2">
            <li><Link href="#pricing" className="hover:text-black">01. Solo Specialist ($4,800)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">02. Boutique Clinic ($8,800)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">03. Full Transformation ($16,500+)</Link></li>
            <li><Link href="#pricing" className="hover:text-black">Studio Care & Support ($395/mo)</Link></li>
          </ul>
        </div>

        <div>
          <span className="block text-gray-900 font-semibold mb-3 tracking-wider uppercase text-[11px]">
            Navigation
          </span>
          <ul className="space-y-2">
            <li><Link href="#scoper" className="hover:text-black">Practice Strategy Guide</Link></li>
            <li><Link href="#casestudy" className="hover:text-black">Hali Institute Client Story</Link></li>
            <li><Link href="#philosophy" className="hover:text-black">Why Practices Choose Us</Link></li>
            <li><Link href="#booking" className="hover:text-black">Book a 15-Minute Call</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-[11px]">
        <div>
          © {new Date().getFullYear()} MVMNT Studio Pty Ltd. Handcrafted in Australia for ambitious practices.
        </div>
        <div className="flex gap-6">
          <span>Warm & Thoughtful Design</span>
          <span>Clear Patient Copywriting</span>
          <span>Effortless Booking</span>
        </div>
      </div>
    </footer>
  );
}
