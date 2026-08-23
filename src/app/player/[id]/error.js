"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <main className="mx-auto my-[60px] max-w-[900px] px-5 text-white">
      <div className="rounded-2xl bg-red-900 p-10 text-center">
        <h1>Something went wrong</h1>

        <p className="mt-[15px] text-[#ddd]">
          {error?.message}
        </p>

        <button
          onClick={() => reset()}
          className="mt-[25px] rounded-[10px] border-0 bg-blue-600 px-[30px] py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}