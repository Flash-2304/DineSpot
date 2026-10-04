import { Router } from "express";
import {
  getRestaurants,
  getFeaturedRestaurants,
  getRestaurantBySlug,
  checkAvailability,
} from "../controllers/restaurantController";

const router = Router();

router.get("/", getRestaurants);
router.get("/featured", getFeaturedRestaurants);
router.get("/:slug", getRestaurantBySlug);
router.get("/:id/availability", checkAvailability);

export default router;
