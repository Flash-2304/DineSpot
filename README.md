# 🍽️ DineSpot

A full-stack restaurant table booking platform built with React, TypeScript, Node.js, Express, and MongoDB.

## Overview
DineSpot lets customers discover restaurants, check real-time table availability, and book reservations online.
It supports three roles — **Customer**, **Restaurant Owner**, and **Admin** — each with its own dashboard and permissions.

## Tech Stack

**Frontend:** React, Vite, TypeScript, Tailwind CSS, React Router, Context API, Axios, React Hot Toast, Lucide React
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Bcrypt, Multer, CORS

## Features
- JWT authentication with role-based access control
- Browse, search, and filter restaurants
- Real-time table availability check before booking
- Customer booking history with cancellation
- Owner dashboard: restaurant registration, booking management
- Admin dashboard: restaurant approval, platform statistics

## Project Structure
```
dinespot/
  server/   → Express + TypeScript REST API
  client/   → React + TypeScript + Vite frontend
```

## Getting Started

### 1. Backend
```bash
cd server
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev             # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev             # runs on http://localhost:5173
```

### 3. MongoDB
Use a local MongoDB instance or a free MongoDB Atlas cluster, and paste the connection string into `server/.env` as `MONGO_URI`.

## API Overview
| Area | Routes |
|---|---|
| Auth | `/api/auth/register`, `/api/auth/login`, `/api/auth/me` |
| Restaurants | `/api/restaurants`, `/api/restaurants/featured`, `/api/restaurants/:slug`, `/api/restaurants/:id/availability` |
| Bookings | `/api/bookings`, `/api/bookings/my`, `/api/bookings/:id/cancel` |
| Owner | `/api/owner/restaurant`, `/api/owner/bookings`, `/api/owner/bookings/:id/status` |
| Admin | `/api/admin/restaurants`, `/api/admin/restaurants/:id/approve`, `/api/admin/stats` |

