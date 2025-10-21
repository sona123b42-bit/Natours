"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ClientLayout({ user, children }) {
  const pathname = usePathname();

  // Routes where header should be hidden
  const noHeaderRoutes = ["/login", "/signup", "/account/reset"];
  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header user={user} />}
      <div className="w-full mx-auto p-[40px]">{children}</div>
    </>
  );
}
