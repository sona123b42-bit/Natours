"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/_components/Header";

export default function ClientLayout({ user, children }) {
  const router = useRouter();
  const pathname = usePathname();

  // all routes that should hide header + be accessible only to logged-out users
  const authRoutes = ["/login", "/signup", "/forgotpassword", "/resetPassword"];

  const isAuthRoute = authRoutes.some((r) =>
    pathname.toLowerCase().startsWith(r.toLowerCase())
  );

  useEffect(() => {
    if (user && isAuthRoute) router.replace("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname]);

  const hideHeader = isAuthRoute;

  return (
    <>
      {!hideHeader && <Header user={user} />}
      <div className="w-full mx-auto p-[40px]">{children}</div>
    </>
  );
}
