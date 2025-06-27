import { useFormContext } from "react-hook-form";
import { cuisines } from "../../constants/cuisines";
import { checkboxInputCuisine } from "../../constants/style";
import { restaurantFormData } from "./types";

const FormRestaruantCuisines = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<restaurantFormData>();

  const selectedCuisines = watch("cuisines");

  const handleCheckboxChange = (cuisine: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCuisines, cuisine]
      : selectedCuisines.filter((item) => item !== cuisine);
    if (updated.length > 0) {
      setValue("cuisines", updated as [string, ...string[]]);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl">Cuisines</h1>
      <p className="text-gray-600 font-medium">
        Create your menu and give each item a name and a price
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 py-5">
        {cuisines?.map((cuisine) => (
          <div className="flex items-center gap-1 text-lg" key={cuisine}>
            <input
              checked={selectedCuisines?.includes(cuisine)}
              type="checkbox"
              className={`${checkboxInputCuisine}`}
              onChange={(e) => handleCheckboxChange(cuisine, e.target.checked)}
            />
            <label htmlFor="cusine">{cuisine}</label>
          </div>
        ))}
      </div>
      {errors?.cuisines && (
        <p className="text-red-500">{errors?.cuisines.message}</p>
      )}
      <hr className="my-6 text-gray-500" />
    </>
  );
};

export default FormRestaruantCuisines;

// {...register("cuisines")} value={cuisine} checked={values.cuisines?.includes(cuisine)} onChange={(e) => {
//     const isChecked = e.target.checked;
//     const currentCuisines = values.cuisines || [];

//     if (isChecked) {
//         onChange("cuisines", [...currentCuisines, cuisine]);
//     } else {
//         onChange("cuisines", currentCuisines.filter(item => item !== cuisine));
//     }
// }}
