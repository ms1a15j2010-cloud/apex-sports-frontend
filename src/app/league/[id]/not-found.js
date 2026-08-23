import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto my-[60px] max-w-[900px] px-5 text-white">
      <div className="rounded-2xl bg-gray-900 p-[50px] text-center">
        <h1 className="mb-5 text-[60px] font-bold">
          404
        </h1>

        <h2>Page Not Found</h2>

        <p className="mt-2.5 text-gray-400">
          The page you are looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-[30px] inline-block rounded-[10px] bg-blue-600 px-[30px] py-3 font-bold text-white no-underline transition hover:bg-blue-700"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}