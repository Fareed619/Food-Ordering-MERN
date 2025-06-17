import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Order } from "./OrderApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to create restaurant");
      }
      return response.json();
    } catch (error) {
      console.log("Error in my restaurant api ", error);
      toast.error(error?.message);
    }
  };

  const {
    mutate: createRestaurant,
    isPending,
    error,
    isSuccess,
  } = useMutation({ mutationFn: createMyRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { createRestaurant, isPending };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    } catch (error) {
      console.log("error in use get my resturant ", error);
      toast.error(error.message);
      return;
    }
  };
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  return { restaurant, isLoading, error };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    updatedRestaurantForm: FormData
  ): Promise<Restaurant | undefined> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedRestaurantForm,
      });

      if (!response.ok) {
        throw new Error("Failed to update restaurant");
      }

      return response.json();
    } catch (error) {
      console.log("error in update my restaurant request ", error);
      return;
    }
  };

  const {
    mutate: updateRestaurant,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateMyRestaurantRequest,
  });
  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isPending };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    } catch (error) {
      console.log("error in use get my restaurant orders " + error);
      return;
    }
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetchRestaurantOrders"],
    queryFn: getMyRestaurantOrdersRequest,
  });

  return { orders, isLoading };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrderRequest = async (
    updatedStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    try {
      const token = await getAccessTokenSilently();
      console.log("update status ", updatedStatusOrderRequest);

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/order/${updatedStatusOrderRequest.orderId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updatedStatusOrderRequest.status }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    } catch (error) {
      console.log("error in use update my restaurant order" + error);
      return;
    }
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: updateMyRestaurantOrderRequest,
    onSuccess: () => {
      // Use the onSuccess callback here
      toast.success("Order updated");
    },
    onError: () => {
      // Use onError for error handling
      toast.error("Unable to update order ");
      reset();
    },
  });

  return { isPending, updateRestaurantStatus };
};
