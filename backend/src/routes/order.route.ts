import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import {
  createCheckoutSessionController,
  stripeWebhookHandlerController,
  getMyOrdersController,
} from "../controllers/order.controller";

const router = Router();

router.get("/myorder", jwtCheck, jwtParse, getMyOrdersController);
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSessionController
);

router.post("/checkout/webhook", stripeWebhookHandlerController);
export default router;
