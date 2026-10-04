import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import User from "../models/User";
import Booking from "../models/Booking";

export const getAllRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await Restaurant.find().populate("owner", "name email");
  res.json(restaurants);
};

export const approveRestaurant = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
  restaurant.isApproved = true;
  await restaurant.save();
  res.json(restaurant);
};

export const getStats = async (_req: Request, res: Response) => {
  const [totalUsers, totalRestaurants, approvedRestaurants, totalBookings] = await Promise.all([
    User.countDocuments(),
    Restaurant.countDocuments(),
    Restaurant.countDocuments({ isApproved: true }),
    Booking.countDocuments(),
  ]);
  res.json({ totalUsers, totalRestaurants, approvedRestaurants, totalBookings });
};
