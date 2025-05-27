import { useFormContext } from "react-hook-form";
import { restaurantFormData } from "./types";

type Props = {
  index: number;
  remove: () => void;
};

const MenuItem = ({ index, remove }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<restaurantFormData>();
  return (
    <>
      <div
        className={`flex items-end flex-wrap gap-8 my-4 ${
          errors.menuItems?.[index]?.name && "py-2"
        } `}
      >
        <label className="relative">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-black block pb-1"
          >
            Name{" "}
          </label>
          <input
            {...register(`menuItems.${index}.name`)}
            className="grow w-full  text-md border p-1 rounded  bg-gray-50  "
          />
          {errors.menuItems?.[index]?.name && (
            <p className="text-red-500 text-sm absolute">
              {errors.menuItems[index].name?.message}
            </p>
          )}
        </label>

        <label className="relative">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-black block pb-1"
          >
            Price ($){" "}
          </label>
          <input
            {...register(`menuItems.${index}.price`, { valueAsNumber: true })}
            className="grow w-full  text-md border p-1 rounded  bg-gray-50  "
          />
          {errors.menuItems?.[index]?.price && (
            <p className="text-red-500 text-sm absolute">
              {errors.menuItems[index].price?.message}
            </p>
          )}
        </label>
        <button
          type="button"
          onClick={() => remove(index)}
          className="w-fit  p-1.5 px-6   bg-red-500 text-white  rounded-lg shadow cursor-pointer "
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default MenuItem;
