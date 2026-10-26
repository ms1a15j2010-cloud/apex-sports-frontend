"use client";

export default function SearchBar({
  value,
  onChange,
  onSearch,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch?.(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-[25px] flex flex-col gap-3 sm:flex-row"
      role="search"
    >
      <input
        type="search"
        name="q"
        aria-label="Search teams, players, leagues and matches"
        placeholder="Search teams, players, leagues..."
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-gray-900 px-[18px] py-[14px] text-base text-white outline-none placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
      />

      <button
        type="submit"
        className="rounded-xl bg-green-500 px-6 py-[14px] font-bold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Search
      </button>
    </form>
  );
}
