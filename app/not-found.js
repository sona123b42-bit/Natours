import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold mb-10">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="bg-[#55c57a] text-white px-14 py-5 rounded-lg font-semibold hover:bg-[#2e864b] transition-all duration-300 shadow-md mt-30"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
