"use client";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import "@/app/_styles/style.css";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [submit, setSubmit] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      setIsPending(true);
      const res = await fetch(`${BASE_URL}users/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid email");
      toast.success("The reset password link has been sent to your email!");
      setSubmit(true);
    } catch (err) {
      toast.error(err.message || "Reset password failed");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="main">
      {submit ? (
        <p className="text-center space-y-6 mt-4 text-3xl font-semibold mb-10">
          Check your email for a link to reset your password!
        </p>
      ) : (
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Enter your email</h2>

          <form className="form form--login" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled={isPending}
                className="form__input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form__group">
              <button
                type="submit"
                className="btn btn--green"
                disabled={isPending}
              >
                {!isPending ? "Enter" : <SpinnerMini />}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
