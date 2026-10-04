import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import Booking from "../models/Booking";

export const getRestaurants = async (req: Request, res: Response) => {
  const { city, cuisine, search } = req.query;
  const filter: Record<string, unknown> = { isApproved: true };

  if (city) filter.city = new RegExp(city as string, "i");
  if (cuisine) filter.cuisine = cuisine;
  if (search) filter.name = new RegExp(search as string, "i");

  const restaurants = await Restaurant.find(filter).sort({ createdAt: -1 });
  res.json(restaurants);
};

export const getFeaturedRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await Restaurant.find({ isApproved: true }).limit(6);
  res.json(restaurants);
};

export const getRestaurantBySlug = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ slug: req.params.slug, isApproved: true });
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
  res.json(restaurant);
};

export const checkAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, time, partySize } = req.query;

  const restaurant = await Restaurant.findById(id);
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

  const existingBookings = await Booking.find({
    restaurant: id,
    date,
    time,
    status: { $in: ["pending", "confirmed"] },
  });

  const bookedSeats = existingBookings.reduce((sum, b) => sum + b.partySize, 0);
  const available = restaurant.capacity - bookedSeats >= Number(partySize || 1);

  res.json({ available, remainingCapacity: restaurant.capacity - bookedSeats });
};
