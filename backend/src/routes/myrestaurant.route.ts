import { Router } from "express";
import {
  createMyRestaurantController,
  getMyRestaurantController,
  updateMyRestaurantController,
  getMyRestaurantOrdersController,
  updatedOrderStatusController,
} from "../controllers/myrestaurant.controller";
import { upload } from "../middlewares/multerStorage";
import { validateMyRestaurantRequest } from "../middlewares/validation";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = Router();
// /api/my/restaurant

// Create
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurantController
);
// Get
router.get("/", jwtCheck, jwtParse, getMyRestaurantController);

router.get("/order", jwtCheck, jwtParse, getMyRestaurantOrdersController);
// Update
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateMyRestaurantController
);

router.put(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  updatedOrderStatusController
);

export default router;
