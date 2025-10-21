"use client";

import Link from "next/link";

function NavItem({ href, text, icon, active = false }) {
  async function handleClick(e) {
    if (text === "Log out") {
      e.preventDefault();

      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        try {
          // ✅ Call backend to clear cookie
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/logout`, {
            method: "GET",
            credentials: "include",
          });

          // ✅ Clear local storage if any JWT token exists
          if (typeof window !== "undefined") {
            localStorage.removeItem("jwt");
          }

          // ✅ Redirect to home page after logout
          window.location.href = "/";
        } catch (err) {
          console.error("Logout error:", err.message);
          alert("Logout failed. Please try again.");
        }
      }
    }
  }

  return (
    <li className={active ? "side-nav--active" : ""}>
      <Link href={href} onClick={handleClick}>
        <svg>
          <use xlinkHref={`img/icons.svg#icon-${icon}`} />
        </svg>
        {text}
      </Link>
    </li>
  );
}

export default NavItem;
