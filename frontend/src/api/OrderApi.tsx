import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Restaurant } from "./MyRestaurantApi";
import { User } from "./MyUserApi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  resturantId: string;
};

export type CheckoutSessionResponse = {
  url: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
export type Order = {
  _id: string;
  restuarant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDelails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutSessionRequest),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Unable to create checkout session"
        );
      }

      return response.json();
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      throw error;
    }
  };

  const {
    isPending,
    mutateAsync: createCheckoutSession,
    reset,
  } = useMutation({
    mutationFn: createCheckoutSessionRequest,
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create checkout session"
      );
      reset();
    },
  });

  return { createCheckoutSession, isPending };
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[] | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/order/myorder`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get orders");
      }

      return response.json();
    } catch (error) {
      console.log("Error in get my orders request " + error);
      return;
    }
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetchMyOrders"],
    queryFn: getMyOrdersRequest,
    refetchInterval: 5000,
  });

  return { orders, isLoading };
};
