import Link from "next/link";
import Image from "next/image";
import "@/app/_styles/style.css";
const CLOUDINARY_BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE;
export default function TourCard({ tours }) {
  return (
    <div className="max-w-[120rem] mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-[7rem] sm:grid-cols-1">
      {tours.map((tour) => (
        <div key={tour._id} className="card">
          {/* ---------- HEADER ---------- */}
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <Image
                src={`${CLOUDINARY_BASE}/${tour.imageCover}`}
                alt={tour.name}
                width={500}
                height={300}
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>{tour.name}</span>
            </h3>
          </div>

          {/* ---------- DETAILS ---------- */}
          <div className="card__details">
            <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
            <p className="card__text">{tour.summary}</p>

            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span>{tour.startLocation.description}</span>
            </div>

            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-calendar" />
              </svg>
              <span>
                {new Date(tour.startDates[0]).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-flag" />
              </svg>
              <span>{`${tour.locations.length} stops`}</span>
            </div>

            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-user" />
              </svg>
              <span>{`${tour.maxGroupSize} people`}</span>
            </div>
          </div>

          {/* ---------- FOOTER ---------- */}
          <div className="card__footer">
            <p>
              <span className="card__footer-value">${tour.price}</span>{" "}
              <span className="card__footer-text">per person</span>
            </p>

            <p className="card__ratings">
              <span className="card__footer-value">{tour.ratingsAverage}</span>{" "}
              <span className="card__footer-text">
                rating ({tour.ratingsQuantity})
              </span>
            </p>

            <Link
              href={`/tours/${tour._id}`}
              className="btn btn--green btn--small"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
