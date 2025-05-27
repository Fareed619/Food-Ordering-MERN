import { z } from "zod";

export const formRestaurantSchema = z
  .object({
    restaurantName: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required"),

    city: z
      .string({
        required_error: "City is required",
      })
      .min(1, "City is required"),

    country: z
      .string({
        required_error: "Country is required",
      })
      .min(1, "Country is required"),

    deliveryPrice: z.number({
      invalid_type_error: "Delivery price is required",
    }),

    estimatedDeliveryTime: z.number({
      invalid_type_error: "Estimated Delivery Time  is required",
    }),

    cuisines: z
      .array(z.string())
      .nonempty({ message: "You have to select at least one item" }),

    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type restaurantFormData = z.infer<typeof formRestaurantSchema>;
