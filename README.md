Natours – Adventure Tour Booking Platform

Natours is a modern full-stack web application for discovering, booking, and managing adventure tours worldwide.
Built with a secure RESTful Node.js backend and a performant Next.js frontend, it demonstrates production-grade authentication, dynamic routing, and responsive design.
Tech Stack
Frontend

Next.js 15 (React 19) – server components, SSR/CSR, and Turbopack

Tailwind CSS 4 – modern, responsive styling

React Query + Supabase (optional integration) – data-fetching and caching

Styled-Components – isolated component styling

React Hot Toast – clean notification UI

Backend

Node.js + Express.js – RESTful API design

MongoDB + Mongoose – flexible data modeling

JWT Auth + Cookies – secure login/session handling

SendGrid / Nodemailer – transactional email for password reset

bcrypt.js + crypto – password hashing and token encryption

Authentication & Security

User signup, login, logout

JWT authentication with secure, httpOnly cookies

Role-based access control (admin, user, guide)

“Forgot password” / “Reset password” flow with email verification

Encrypted password storage (bcrypt + SHA-256)

ours & Bookings

Browse all available tours

View detailed tour pages (price, guides, duration, description)

Book tours (frontend integration with API)

Responsive layout with mobile-first design

User Account

Update name, email, password, and profile photo

Token refresh and password-change flow

Persistent sessions across reloads
