"use client";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import "@/app/_styles/style.css";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
function LoginForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // stop default /login POST
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setIsPending(true);
      const res = await fetch(`${BASE_URL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid email or password");

      toast.success("Logged in successfully!");
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
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

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

          <div className="form__group">
            <button type="submit" className="btn btn--green">
              {!isPending ? "Login" : <SpinnerMini />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
