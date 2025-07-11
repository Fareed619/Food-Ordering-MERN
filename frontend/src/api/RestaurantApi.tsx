import { useQuery } from "@tanstack/react-query";
import { RestaurantSearchResponse, SearchState } from "../pages/SearchPage";
import { Restaurant } from "./MyRestaurantApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const {
    data: results,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["searchRestaurant", searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return { isLoading, results, refetch };
};

export const useGetRestuarantById = (restaurantId?: string) => {
  const getRestuarnById = async (): Promise<Restaurant | undefined> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error("failed fetching restaurant");
      }
      return response.json();
    } catch (error) {
      console.log("error in get restaurant by id ", error);
      return;
    }
  };

  const { isLoading, data: restaurantInfo } = useQuery({
    queryKey: ["getRestaurant"],
    queryFn: getRestuarnById,
    enabled: !!restaurantId,
  });

  return { isLoading, restaurantInfo };
};
