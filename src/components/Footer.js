import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-[#1e293b] text-white">
      <div className="max-w-[1400px] mx-auto py-[55px] px-[20px] flex flex-col md:flex-row justify-between gap-[35px] md:gap-[60px] flex-wrap">
        
        <div className="max-w-[420px]">
          <h2 className="text-[28px] mb-[15px] font-bold">⚽ Apex Sports</h2>
          <p className="text-[#94a3b8] leading-[1.8]">
            Real-time football scores, fixtures, standings,
            match statistics and football news from leagues
            around the world.
          </p>
        </div>

        <div className="flex gap-[35px] md:gap-[70px] flex-wrap">
          <div>
            <h3 className="mb-[15px] text-[18px] font-bold">Navigation</h3>
            <Link href="/" className="block my-[10px] text-[#94a3b8] hover:text-[#3b82f6] transition-colors no-underline">
              Home
            </Link>
            <Link href="/league/epl" className="block my-[10px] text-[#94a3b8] hover:text-[#3b82f6] transition-colors no-underline">
              Leagues
            </Link>
            <Link href="/contact" className="block my-[10px] text-[#94a3b8] hover:text-[#3b82f6] transition-colors no-underline">
              Contact
            </Link>
          </div>

          <div>
            <h3 className="mb-[15px] text-[18px] font-bold">Legal</h3>
            <Link href="/privacy-policy" className="block my-[10px] text-[#94a3b8] hover:text-[#3b82f6] transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block my-[10px] text-[#94a3b8] hover:text-[#3b82f6] transition-colors no-underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>

      <div className="border-t border-[#1e293b] p-[20px] text-center text-[#64748b] text-[14px]">
        © {new Date().getFullYear()} Apex Sports. All rights reserved.
      </div>
    </footer>
  );
}