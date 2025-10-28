"use client";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import "@/app/_styles/style.css";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function ResetPasswordForm({ token }) {
  const [isPending, setIsPending] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault(); // stop default /login POST
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password");
    const passwordConfirm = formData.get("confirmPassword");

    try {
      setIsPending(true);
      const res = await fetch(`${BASE_URL}users/resetPassword/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ include cookies
        body: JSON.stringify({ password, passwordConfirm }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password is Invalid");

      toast.success("Password reset successful!");
      // optionally redirect:
      setTimeout(() => {
        window.location.href = "/";
      }, 1200); //
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Reset your password</h2>

        <form className="form form--login" onSubmit={handleSubmit}>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              disabled={isPending}
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="confirmPassword" className="form__label">
              confirmPassword
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              disabled={isPending}
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <div className="form__group">
            <button type="submit" className="btn btn--green">
              {!isPending ? "Reset password" : <SpinnerMini />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
