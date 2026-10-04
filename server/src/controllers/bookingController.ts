import { Response } from "express";
import Booking from "../models/Booking";
import { AuthRequest } from "../middleware/auth";

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurant, date, time, partySize, notes } = req.body;
    const booking = await Booking.create({
      customer: req.user?.id,
      restaurant,
      date,
      time,
      partySize,
      notes,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: (err as Error).message });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  const bookings = await Booking.find({ customer: req.user?.id })
    .populate("restaurant", "name city image")
    .sort({ createdAt: -1 });
  res.json(bookings);
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (booking.customer.toString() !== req.user?.id) {
    return res.status(403).json({ message: "Not your booking" });
  }
  booking.status = "cancelled";
  await booking.save();
  res.json(booking);
};
