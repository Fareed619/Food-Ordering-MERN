import MenuItem from "./MenuItem";
import { useFieldArray, useFormContext } from "react-hook-form";
import { restaurantFormData } from "./types";

const FormRestaruantMenuItems = () => {
  const { control } = useFormContext<restaurantFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <>
      <h1 className="font-bold text-2xl">Menu</h1>
      <p className="text-gray-600 font-medium">
        Create your menu and give each item a name and a price
      </p>
      <div>
        {fields?.map((field, index) => (
          <MenuItem key={field.id} index={index} remove={remove} />
        ))}
        <button
          type="button"
          className="w-fit bg-[#000002] text-white p-2 px-6 mt-5 rounded-lg shadow cursor-pointer "
          onClick={() => append({ name: "", price: 0 })}
        >
          Add Menu Item
        </button>
      </div>
      <hr className="my-6 text-gray-500" />
    </>
  );
};

export default FormRestaruantMenuItems;
