import { FormProvider, useForm } from "react-hook-form";
import { formRestaurantSchema, restaurantFormData } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";

// COMPONENTS
import FormRestaruantDetails from "./FormRestaruantDetails";
import FormRestaurantImage from "./FormRestaurantImage";
import FormRestaruantCuisines from "./FormRestaruantCuisines";
import FormRestaruantMenuItems from "./FormRestaruantMenuItems";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../../api/MyRestaurantApi";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const ManageRestaurantForm = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant, isLoading } = useGetMyRestaurant();
  const { updateRestaurant, isPending: LoadingUpdateRestaurant } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;
  const methods = useForm<restaurantFormData>({
    resolver: zodResolver(formRestaurantSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    methods.reset(updatedRestaurant);
  }, [restaurant, methods]);

  const onSubmit = (data: restaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", data.restaurantName);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("deliveryPrice", (data.deliveryPrice * 100).toString());
    formData.append(
      "estimatedDeliveryTime",
      data.estimatedDeliveryTime.toString()
    );
    data.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    data.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (data.imageFile) {
      formData.append(`imageFile`, data.imageFile);
    }

    if (isEditing) {
      updateRestaurant(formData);
    } else {
      createRestaurant(formData);
    }
  };

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }
  return (
    <FormProvider {...methods}>
      <div className="bg-gray-200 rounded shadow-xl w-full px-5 py-3">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* <===  SECTION 1  ===>  */}
          <FormRestaruantDetails />

          {/* <===  SECTION 2  ===>  */}
          <FormRestaruantCuisines />

          {/* <===  SECTION 3  ===>  */}
          <FormRestaruantMenuItems />

          {/* <===  SECTION 4  ===>  */}
          <FormRestaurantImage />

          <button
            type="submit"
            className={`w-fit ${
              isPending || LoadingUpdateRestaurant
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-700"
            }  text-white p-2 px-6 rounded-lg mb-5 shadow cursor-pointer `}
          >
            {isPending || LoadingUpdateRestaurant ? (
              <Loader className="text-white animate-spin" />
            ) : (
              "submit"
            )}
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default ManageRestaurantForm;
