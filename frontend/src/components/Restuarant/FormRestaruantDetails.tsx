// type FormData = {
//     name: string
//     city: string
//     country: string
//     deliveryPrice: number
//     estimatedDeliveryTime: number
//     cuisines: string[]
// }

import { useFormContext } from "react-hook-form";
import { restaurantFormData } from "./types";

// type FormDataDetails = {
//     values: { name: string; city: string; country: string, deliveryPrice: number, estimatedDeliveryTime: number, cuisines: [] };
//     onChange: (field: string, value: string | number) => void;
//     register: UseFormRegister<FormData>;
//     errors: FieldErrors<FormData>
// }

const FormRestaruantDetails = () => {
  const {
    register,
    formState: { errors }, // object contains all the error names
  } = useFormContext<restaurantFormData>();

  return (
    <>
      <h1 className="font-bold text-2xl">Details</h1>
      <p className="text-gray-600 font-medium">
        Enter the details about your restaurant
      </p>
      <div className="mt-10  flex flex-col gap-7">
        <label className="">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-black block pb-1"
          >
            Name{" "}
          </label>
          <input
            {...register("restaurantName")}
            className="grow w-full  text-md border p-1 rounded  bg-gray-50  "
          />
          {errors?.restaurantName && (
            <p className="text-red-500">{errors?.restaurantName.message}</p>
          )}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="">
            <label
              htmlFor="city"
              className="text-lg font-semibold text-black block pb-1"
            >
              City{" "}
            </label>
            <input
              {...register("city")}
              type="text"
              className="grow w-full  text-md border p-1 rounded  bg-gray-50 "
            />
            {errors?.city && (
              <p className="text-red-500">{errors?.city.message}</p>
            )}
          </label>
          <label className="">
            <label
              htmlFor="name"
              className="text-lg font-semibold text-black block pb-1"
            >
              Country{" "}
            </label>
            <input
              {...register("country")}
              type="text"
              className="grow w-full text-md border p-1 rounded  bg-gray-50 "
            />
            {errors?.country && (
              <p className="text-red-500">{errors?.country.message}</p>
            )}
          </label>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <label className="">
            <label
              htmlFor="Delivery"
              className="text-lg font-semibold text-black block pb-1"
            >
              Delivery Price ($){" "}
            </label>
            <input
              {...register("deliveryPrice", { valueAsNumber: true })}
              type="number"
              className="grow w-[70%] lg:w-[50%] text-md border p-1 rounded  bg-gray-50  "
            />
            {errors?.deliveryPrice && (
              <p className="text-red-500">{errors?.deliveryPrice.message}</p>
            )}
          </label>
          <label className="">
            <label
              htmlFor="Estimated Delivery"
              className="text-lg font-semibold text-black block pb-1"
            >
              Estimated Delivery Time (minutes)
            </label>
            <input
              {...register("estimatedDeliveryTime", { valueAsNumber: true })}
              type="number"
              className="grow w-[70%] lg:w-[50%]  text-md border p-1 rounded  bg-gray-50  "
            />
            {errors?.estimatedDeliveryTime && (
              <p className="text-red-500">
                {errors?.estimatedDeliveryTime.message}
              </p>
            )}
          </label>
        </div>
      </div>

      <hr className="my-6 text-gray-500" />
    </>
  );
};

export default FormRestaruantDetails;
