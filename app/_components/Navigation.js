import Link from "next/link";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;
export default function Navigation({ user }) {
  console.log(user);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center text-white">
        <li>
          <Link href="/tours" className="hover:green-500 transition-colors">
            Tours
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={
                  user.photo?.startsWith("http")
                    ? user.photo
                    : `${CLOUDINARY_BASE}/${user.photo || "users/default.jpg"}`
                }
                className="h-10 w-10 rounded-full"
                alt={user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Log In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
