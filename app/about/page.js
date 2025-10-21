import Image from "next/image";
import Link from "next/link";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;
export const metadata = {
  title: "About",
};

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:space-x-20 text-center md:text-left ">
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-4xl mb-10 text-gray-900 font-bold">
            Welcome to Natours
          </h1>

          <div className="space-y-8 text-lg">
            <p>
              At Natours, we believe that life is meant for adventure. Our tours
              are carefully designed to connect you with nature’s most
              breathtaking destinations — from mountain peaks to tropical
              rainforests. Whether you’re an adrenaline seeker or simply love
              exploring the outdoors, Natours offers unforgettable experiences
              that bring you closer to the beauty of the world.
            </p>
            <p>
              We’re passionate about responsible travel. Every Natours journey
              is created with sustainability in mind, ensuring that local
              communities benefit and natural environments are preserved. By
              traveling with us, you’re not just exploring — you’re helping
              protect the planet for future generations while enjoying authentic
              cultural experiences guided by local experts.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 pb-6">
          <Image
            src={`${CLOUDINARY_BASE}/tour-8-cover`}
            alt="B beautiful night with sky full of stars"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center md:space-x-20 text-center md:text-left mt-10">
        <div className="flex flex-col md:w-1/2 md:pl-20">
          <div className="space-y-8 text-lg">
            <p>
              The goal of Natours is to inspire adventure and promote
              eco-tourism through technology. Every feature — from the
              interactive design to the detailed tour pages — reflects a passion
              for nature and exploration. Whether it’s hiking scenic trails,
              diving into crystal waters, or trekking across deserts, Natours
              connects travelers with unforgettable outdoor experiences while
              highlighting the harmony between technology and the natural world.
            </p>
            <Link
              href="tours"
              className="inline-block mt-4  px-8 py-5 text-[#fff] text-lg font-semibold bg-[#55c57a] rounded-lg hover:translate-y-[-2px] transition-all shadow-md"
            >
              Explore our beautiful tours
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 pb-6">
          <Image
            src={`${CLOUDINARY_BASE}/tour-9-cover`}
            alt="B beautiful night with sky full of stars"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
