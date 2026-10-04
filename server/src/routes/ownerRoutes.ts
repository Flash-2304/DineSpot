import { Router } from "express";
import {
  getMyRestaurant,
  createRestaurant,
  getOwnerBookings,
  updateBookingStatus,
} from "../controllers/ownerController";
import { protect, authorize } from "../middleware/auth";

const router = Router();

router.use(protect, authorize("owner"));

router.get("/restaurant", getMyRestaurant);
router.post("/restaurant", createRestaurant);
router.get("/bookings", getOwnerBookings);
router.put("/bookings/:id/status", updateBookingStatus);

export default router;
