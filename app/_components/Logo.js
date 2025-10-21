import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo-white.png";
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 p-5">
      <Image
        src={logo}
        height="70"
        width="70"
        alt="The Wild Oasis logo"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
