"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import "@/app/_styles/style.css";
import { updatePasswordClient, updateUser } from "../_lib/sever-actions";
import { useSession } from "../_lib/useSession";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;

export function UserSetting() {
  const { session } = useSession();
  console.log("🟢 Session object:", session);

  const [isUpdatingProfile, startProfileTransition] = useTransition();
  const [isUpdatingPassword, startPasswordTransition] = useTransition();
  const [photoPreview, setPhotoPreview] = useState(
    session?.photo?.startsWith("http")
      ? session.photo
      : `${CLOUDINARY_BASE}/${session?.photo || "/default.jpg"}`
  );

  // ✅ handle update profile
  function handleUpdateProfile(formData) {
    startProfileTransition(async () => {
      try {
        await updateUser(formData);
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error(err.message || "Profile update failed");
      }
    });
  }

  // ✅ handle password change
  function handleUpdatePassword(formData) {
    startPasswordTransition(async () => {
      try {
        await updatePasswordClient(formData);
        toast.success("Password updated successfully! Please log in again");

        // ✅ Redirect quickly after showing toast
        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      } catch (err) {
        toast.error(err.message || "Password update failed");
      }
    });
  }

  return (
    <div className="user-view__content">
      {/* PROFILE SETTINGS */}
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

        <form className="form form-user-data" action={handleUpdateProfile}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form__input"
              placeholder={session?.name}
              disabled={isUpdatingProfile}
            />
          </div>

          <div className="form__group ma-bt-md">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form__input"
              placeholder={session?.email}
              disabled
            />
          </div>

          <div className="form__group form__photo-upload">
            <Image
              src={photoPreview}
              alt="User photo"
              width={80}
              height={80}
              className="form__user-photo"
            />
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              className="form__upload"
              placeholder={session?.photo}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPhotoPreview(URL.createObjectURL(file));
              }}
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>

          <div className="form__group right">
            <button
              type="submit"
              className="btn btn--small btn--green"
              disabled={isUpdatingProfile}
            >
              {!isUpdatingProfile ? "Save settings" : <SpinnerMini />}
            </button>
          </div>
        </form>
      </div>

      <div className="line">&nbsp;</div>

      {/* PASSWORD SETTINGS */}
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>

        <form className="form form-user-password" action={handleUpdatePassword}>
          <div className="form__group">
            <label htmlFor="password-current" className="form__label">
              Current password
            </label>
            <input
              id="password-current"
              name="password-current"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              disabled={isUpdatingPassword}
            />
          </div>

          <div className="form__group">
            <label htmlFor="password" className="form__label">
              New password
            </label>
            <input
              id="password"
              name="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              disabled={isUpdatingPassword}
            />
          </div>

          <div className="form__group ma-bt-lg">
            <label htmlFor="password-confirm" className="form__label">
              Confirm password
            </label>
            <input
              id="password-confirm"
              name="password-confirm"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              disabled={isUpdatingPassword}
            />
          </div>

          <div className="form__group right">
            <button
              type="submit"
              className="btn btn--small btn--green btn--save-password"
              disabled={isUpdatingPassword}
            >
              {!isUpdatingPassword ? "Save password" : <SpinnerMini />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
