import { SubmitHandler, useFormContext } from "react-hook-form";
import { IFormInput } from "../pages/Profile";
import { Loader2 } from "lucide-react";
import { User } from "../api/MyUserApi";
type Props = {
  onSubmit: SubmitHandler<IFormInput>;
  currentUser: User;
  isUpdatingUser: boolean;
  buttonText?: string;
};

const UserProfileForm = ({
  onSubmit,
  currentUser,
  isUpdatingUser,
  buttonText,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<IFormInput>();
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16  flex flex-col gap-7"
      >
        <label className="">
          <label
            htmlFor="email"
            className="text-lg font-semibold text-black block pb-1"
          >
            Email{" "}
          </label>
          <input
            className="grow w-full text-lg border p-2 rounded cursor-not-allowed"
            placeholder={currentUser?.email}
            disabled
          />
        </label>
        <label className="">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-black block pb-1"
          >
            Name{" "}
          </label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            className="grow w-full text-lg border p-2 rounded "
          />
          {errors.name && (
            <span className="text-orange-500">This field is required</span>
          )}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <label className="">
            <label
              htmlFor="addressLine1"
              className="text-lg font-semibold text-black block pb-1"
            >
              Address Line 1{" "}
            </label>
            <input
              {...register("addressLine1", {
                required: true,
                maxLength: 20,
              })}
              type="text"
              className="grow w-full text-lg border p-2 rounded "
            />
            {errors.addressLine1 && (
              <span className="text-orange-500">This field is required</span>
            )}
          </label>
          <label className="">
            <label
              htmlFor="name"
              className="text-lg font-semibold text-black block pb-1"
            >
              City{" "}
            </label>
            <input
              {...register("city", { required: true, maxLength: 20 })}
              type="text"
              className="grow w-full text-lg border p-2 rounded "
            />
            {errors.city && (
              <span className="text-orange-500">This field is required</span>
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
              {...register("country", { required: true, maxLength: 20 })}
              type="text"
              className="grow w-full text-lg border p-2 rounded"
            />
            {errors.country && (
              <span className="text-orange-500">This field is required</span>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-fit bg-orange-500 text-white p-2 px-6 rounded-lg shadow cursor-pointer "
        >
          {isUpdatingUser ? <Loader2 className="animate-spin" /> : buttonText}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
