import Image from "next/image";
import Link from "next/link";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;
export default function Page() {
  return (
    <main className="mt-24">
      <div className="max-w-7xl w-full p-6 mx-auto">
        <div className="flex flex-col-reverse md:flex-row space-y-15 md:space-y-0 justify-between items-center md:space-x-6">
          <div className="flex flex-col space-y-6 items-center md:items-start justify-center md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl font-bold w-lg">Welcome to Natours</h1>
            <p className="text-xl text-gray-600 w-lg">
              Adventure Awaits — Discover the world’s most breathtaking places
              with Natours.” Embark on unforgettable journeys through nature’s
              most stunning landscapes. Whether you crave the thrill of mountain
              trails, the calm of tropical beaches, or the beauty of hidden
              valleys, Natours brings the wild closer to you. Explore, connect,
              and travel responsibly — all with just a few clicks.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Primary Button */}
              <Link
                href="/tours"
                className="bg-[#55c57a] text-white px-14 py-5 rounded-lg font-semibold hover:bg-[#2e864b] transition-all duration-300 shadow-md"
              >
                Explore Tours
              </Link>

              {/* Secondary Button */}
              <Link
                href="/about"
                className="bg-gray-200 text-gray-700 px-14 py-5 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 pb-10">
            <Image
              src={`${CLOUDINARY_BASE}/tour-6-cover`}
              alt="B beautiful night with sky full of stars"
              width={400}
              height={300}
              className="rounded-lg -mt-30"
            />
            <Image
              src={`${CLOUDINARY_BASE}/tour-3-cover`}
              alt="B beautiful night with sky full of stars shadow-lg"
              width={400}
              height={300}
              className="rounded-lg ml-30 -mt-30 shadow-lg"
            />
            <Image
              src={`${CLOUDINARY_BASE}/tour-1-cover`}
              alt="B beautiful night with sky full of stars"
              width={400}
              height={300}
              className="rounded-lg -mt-20 -ml-14 shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
