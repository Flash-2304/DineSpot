import { Response } from "express";
import Restaurant from "../models/Restaurant";
import Booking from "../models/Booking";
import { AuthRequest } from "../middleware/auth";

export const getMyRestaurant = async (req: AuthRequest, res: Response) => {
  const restaurant = await Restaurant.findOne({ owner: req.user?.id });
  res.json(restaurant);
};

export const createRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, cuisine, address, city, capacity, openingTime, closingTime } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-5);

    const restaurant = await Restaurant.create({
      name,
      slug,
      description,
      cuisine,
      address,
      city,
      capacity,
      openingTime,
      closingTime,
      owner: req.user?.id,
    });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Could not create restaurant", error: (err as Error).message });
  }
};

export const getOwnerBookings = async (req: AuthRequest, res: Response) => {
  const restaurant = await Restaurant.findOne({ owner: req.user?.id });
  if (!restaurant) return res.status(404).json({ message: "No restaurant found for this owner" });

  const bookings = await Booking.find({ restaurant: restaurant.id })
    .populate("customer", "name email")
    .sort({ createdAt: -1 });
  res.json(bookings);
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  const booking = await Booking.findById(req.params.id).populate("restaurant");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const restaurant = booking.restaurant as unknown as { owner: { toString: () => string } };
  if (restaurant.owner.toString() !== req.user?.id) {
    return res.status(403).json({ message: "Not your restaurant" });
  }

  booking.status = req.body.status;
  await booking.save();
  res.json(booking);
};
