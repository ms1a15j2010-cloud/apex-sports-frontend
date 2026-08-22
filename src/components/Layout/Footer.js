export default function Footer() {
  return (
    <footer className="border-t border-[#1f2937] bg-[#111827] p-[30px] text-center text-[#94a3b8]">
      © {new Date().getFullYear()} Apex Sports

      <br />

      Live Scores • Fixtures • Statistics • Football Data
    </footer>
  );
}