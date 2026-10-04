import { Router } from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/bookingController";
import { protect, authorize } from "../middleware/auth";

const router = Router();

router.post("/", protect, authorize("customer"), createBooking);
router.get("/my", protect, authorize("customer"), getMyBookings);
router.post("/:id/cancel", protect, authorize("customer"), cancelBooking);

export default router;
