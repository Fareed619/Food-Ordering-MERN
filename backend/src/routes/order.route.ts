import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSessionController, stripeWebhookHandlerController } from "../controllers/order.controller";

const router = Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSessionController
);

router.post("/checkout/webhook", stripeWebhookHandlerController)
export default router;
