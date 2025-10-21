"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getSessionClient() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = Array.from(cookieStore.getAll())
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");
    console.log("🔍 Cookies received:", cookieHeader);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}users/isLoggedIn`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: cookieHeader, // ✅ valid on server
        },
        cache: "no-store", // ensures fresh data
      }
    );
    const data = await res.json();

    if (!res.ok) {
      console.error("getSessionClient failed:", data.message);
      // ✅ If backend says not logged in, clear cookie manually on client
      // (if you’re using NextAuth or client cookies, you can trigger logout)
      return null;
    }
    return data.data?.user || null;
  } catch (err) {
    console.error("getSessionClient failed:", err.message);
    return null;
  }
}

export async function logoutAction() {
  try {
    // Call the backend logout route
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/logout`, {
      method: "GET",
      credentials: "include",
    });
    revalidatePath("account");
    redirect("/");
  } catch (err) {
    console.error("Logout error:", err.message);
  }
}
export async function updatePasswordClient(formData) {
  // ✅ Optional: check session before allowing password change

  try {
    const passwordCurrent = formData.get("password-current");
    const password = formData.get("password");
    const passwordConfirm = formData.get("password-confirm");
    const cookieStore = await cookies();
    // Convert cookies to standard header string
    const cookieHeader = Array.from(cookieStore.getAll())
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");
    const Data = { passwordCurrent, password, passwordConfirm };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}users/updateMyPassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // ✅ forward cookie manually
        },

        body: JSON.stringify(Data),
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password update failed");

    // 4️⃣ Immediately log the user out (invalidate cookie in backend)
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/logout`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
      cache: "no-store",
    });

    console.log("🚪 User logged out due to password change");
  } catch (err) {
    console.error("updatePasswordAction error:", err.message);
    throw err;
  }
}
export async function updateUser(formData) {
  try {
    const name = formData.get("name");
    const photoFile = formData.get("photo");

    // ✅ Build FormData payload
    const uploadData = new FormData();
    uploadData.append("name", name);

    // ✅ Only include photo if file exists
    if (photoFile && typeof photoFile === "object" && photoFile.size > 0) {
      uploadData.append("photo", photoFile);
    }

    // ✅ Forward cookies for authentication
    const cookieStore = await cookies();
    const cookieHeader = Array.from(cookieStore.getAll())
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    // ✅ Send PATCH request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}users/updateMe`,
      {
        method: "PATCH",
        headers: {
          Cookie: cookieHeader,
        },
        body: uploadData, // FormData auto-sets the right content-type
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed!");

    // ✅ Revalidate and redirect
    revalidatePath("account");
    redirect("account");
  } catch (err) {
    console.error("❌ error:", err.message);
    throw err;
  }
}
