import Stripe from "stripe";
import { CheckoutSessionRequest } from "../controllers/order.controller";
import { MenuItemType } from "../models/restaurant.model";
import { configDotenv } from "dotenv";

configDotenv();

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? (process.env.FRONTEND_URL as string)
    : (process.env.FRONTEND_URL_PRO as string);
console.log("Frontend ", FRONTEND_URL);
export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]): any => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());

    if (!menuItem) {
      throw new Error("Menu item not found: " + cartItem.menuItemId);
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "gbp",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
    return line_item;
  });

  return lineItems;
};

export const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "gbp",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};
