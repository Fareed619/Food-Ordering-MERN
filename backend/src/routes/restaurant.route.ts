import { Router } from "express";
import { param } from "express-validator";
import {
  searchRestaurantController,
  getRestaurantByIdController,
} from "../controllers/restaurant.controller";

const router = Router();

// "/api/restaurant"

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City Parameter must be a valid string"),
  searchRestaurantController
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id Parameter must be a valid string"),
  getRestaurantByIdController
);

export default router;
