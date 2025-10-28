# 🏞️ Natours — Adventure Tour Booking Platform

**Natours** is a modern full-stack web application that allows users to **discover, book, and manage adventure tours** around the world.  
It combines a secure RESTful **Node.js backend** with a fast and responsive **Next.js frontend**, featuring production-grade authentication, API security, and mobile-first design.

> “Because adventure shouldn’t be limited to your imagination.” 🌍

---

## 🚀 Tech Stack

### 🖥️ Frontend
- ⚡ **Next.js 15 (React 19)** – Server Components, SSR/CSR, and Turbopack  
- 🎨 **Tailwind CSS 4** – modern, responsive styling  
- 🔁 **React Query** – smart data caching and background updates  
- 💅 **Styled-Components** – scoped, dynamic component styling  
- 🔔 **React Hot Toast** – elegant notifications  

### ⚙️ Backend
- 🧠 **Node.js + Express.js** – structured REST API  
- 🗄️ **MongoDB + Mongoose** – flexible, schema-based data modeling  
- 🔐 **JWT Auth + Cookies** – secure login/session handling  
- 📧 **Nodemailer / SendGrid** – email service for password reset  
- 🔑 **bcrypt.js + crypto** – password hashing and token encryption  

---

## 🔒 Key Features

### Authentication & Security
- Secure **signup**, **login**, and **logout**
- **JWT authentication** stored in `httpOnly` cookies
- **Forgot / Reset Password** flow with time-limited email link  
- **Role-based access control** (`user`, `guide`, `admin`)
- Passwords hashed with **bcrypt** and auto-invalidated on change

### Tours & Bookings
- Browse and view detailed tours  
- Responsive, mobile-first design  
- Future integration for **Stripe payments**

### User Account
- Update name, email, password, and profile photo  
- Persisted sessions with cookie-based login  
- Real-time toast notifications for all major actions  

---

## ⚙️ Environment Setup

Create a `.env` file in your backend root (not committed to GitHub):

```env
NODE_ENV=development
PORT=8000
DATABASE=<your MongoDB connection string>
JWT_SECRET=<your secret key>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=<your email or API user>
EMAIL_PASSWORD=<your email password or app password>
FRONTEND_URL=http://localhost:3000

