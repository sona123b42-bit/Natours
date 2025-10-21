"use client";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;
import dynamic from "next/dynamic";
const MapLeaflet = dynamic(() => import("@/app/_components/MapLeaflet"), {
  ssr: false,
});
import "@/app/_styles/style.css";
import Image from "next/image";

import { useSession } from "../_lib/useSession";
import Spinner from "./Spinner";
export default function EachOneOfTour({ tour }) {
  const { session, loading } = useSession();
  if (loading) return <Spinner />;
  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  return (
    <main className="natours">
      {/* HEADER SECTION */}
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <Image
            src={`${CLOUDINARY_BASE}/${tour.imageCover}`}
            alt={tour.name}
            width={1200}
            height={600}
            className="header__hero-img"
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name} tour</span>
          </h1>

          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>

            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

              <OverviewBox label="Next date" text={date} icon="calendar" />
              <OverviewBox
                label="Difficulty"
                text={tour.difficulty}
                icon="trending-up"
              />
              <OverviewBox
                label="Participants"
                text={`${tour.maxGroupSize} people`}
                icon="user"
              />
              <OverviewBox
                label="Rating"
                text={`${tour.ratingsAverage} / 5`}
                icon="star"
              />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour.guides.map((guide) => (
                <div key={guide._id} className="overview-box__detail">
                  <Image
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    width={56}
                    height={56}
                    className="overview-box__img"
                  />
                  {guide.role === "lead-guide" && (
                    <span className="overview-box__label">Lead guide</span>
                  )}
                  {guide.role === "guide" && (
                    <span className="overview-box__label">Tour guide</span>
                  )}
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>

          {tour.description.split("\n").map((p, i) => (
            <p key={i} className="description__text">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* PICTURES SECTION */}
      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div key={i} className="picture-box">
            <Image
              src={`${CLOUDINARY_BASE}/${img}`}
              alt={`The ${tour.name} picture ${i + 1}`}
              width={800}
              height={600}
              className={`picture-box__img picture-box__img--${i + 1}`}
            />
          </div>
        ))}
      </section>

      {/* MAP SECTION */}
      <section className="section-map">
        <MapLeaflet locations={tour.locations} />
      </section>

      {/* REVIEWS SECTION */}
      <section className="section-reviews">
        <div className="reviews">
          {tour.review?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <Image
              src="/img/logo-white.png"
              alt="Natours logo"
              width={100}
              height={100}
            />
          </div>

          <Image
            src={`https://res.cloudinary.com/dkxaoc4qd/image/upload/${tour.images[1]}`}
            alt="Tour picture"
            width={300}
            height={200}
            className="cta__img cta__img--1"
          />

          <Image
            src={`https://res.cloudinary.com/dkxaoc4qd/image/upload/${tour.images[2]}`}
            alt="Tour picture"
            width={300}
            height={200}
            className="cta__img cta__img--2"
          />

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>

            {session ? (
              <button
                className="btn btn--green span-all-rows"
                data-tour-id={tour.id}
              >
                Book tour now!
              </button>
            ) : (
              <a
                href="/login"
                className="btn btn--green span-all-rows inline-block"
              >
                Log in to book tour
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
// --- Reusable overview box ---
function OverviewBox({ label, text, icon }) {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
}

// --- Review card stub (use your own component if needed) ---
export function ReviewCard({ review }) {
  const cloudBase = process.env.NEXT_PUBLIC_CLOUDINARY_BASE; // ✅ your Cloudinary env
  const photoUrl = review.user.photo?.startsWith("http")
    ? review.user.photo
    : `${cloudBase}/${review.user.photo || "default.jpg"}`;

  return (
    <div className="reviews__card">
      {/* Avatar */}
      <div className="reviews__avatar flex items-center gap-4">
        <Image
          src={photoUrl}
          alt={review.user.name}
          width={50}
          height={50}
          className="reviews__avatar-img rounded-full object-cover"
        />
        <h6 className="reviews__user font-semibold">{review.user.name}</h6>
      </div>

      {/* Review text */}
      <p className="reviews__text mt-3 text-gray-700">{review.review}</p>

      {/* Rating stars */}
      <div className="reviews__rating flex mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`reviews__star ${
              review.rating >= star
                ? "reviews__star--active"
                : "reviews__star--inactive"
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}
