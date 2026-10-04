import { Router } from "express";
import { getAllRestaurants, approveRestaurant, getStats } from "../controllers/adminController";
import { protect, authorize } from "../middleware/auth";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/restaurants", getAllRestaurants);
router.put("/restaurants/:id/approve", approveRestaurant);
router.get("/stats", getStats);

export default router;
