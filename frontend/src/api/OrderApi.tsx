import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
