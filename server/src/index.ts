import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import ownerRoutes from "./routes/ownerRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => res.json({ status: "DineSpot API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
