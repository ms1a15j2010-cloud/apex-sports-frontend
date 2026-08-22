"use client";

const tabs = [
  "All",
  "Teams",
  "Players",
  "Leagues",
  "Matches",
];

export default function SearchTabs({
  active,
  onChange,
}) {
  return (
    <div className="mb-[25px] flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const isActive = active === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              cursor-pointer
              rounded-[30px]
              px-5
              py-2.5
              font-bold
              text-white
              transition
              ${
                isActive
                  ? "border-0 bg-green-500 hover:bg-green-600"
                  : "border border-gray-700 bg-gray-900 hover:bg-gray-800"
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}