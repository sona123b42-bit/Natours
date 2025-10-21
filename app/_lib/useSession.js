"use client";
import { useState, useCallback, useEffect } from "react";

export function useSession(initialUser = null) {
  const [session, setSession] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  // 🔄 Optional: refresh session manually (after login/logout)
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}users/isLoggedIn`,
        {
          method: "GET",
          credentials: "include", // ensures cookie is sent
          cache: "no-store", // always get latest
        }
      );

      console.log("🟡 Status:", res.status);
      const data = await res.json();
      console.log("🧩 Response data:", data);
      setSession(data.data?.user || null);
    } catch (err) {
      console.error("Session refresh failed:", err.message);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);
  return { session, setSession, loading, refreshSession };
}
