import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useGetMyUserProfile } from "../api/MyUserApi";
import { useEffect } from "react";
import UserProfileForm from "../components/UserProfileForm";

export interface IFormInput {
  name: string;
  city: string;
  addressLine1: string;
  country: string;
}
type Props = {
  title?: string;
  buttonText?: string;
  onSubmit: SubmitHandler<IFormInput>;
  isUpdatingUser: boolean;
};

const Profile = ({
  title = "User Profile",
  buttonText = "Submit",
  onSubmit,
  isUpdatingUser,
}: Props) => {
  const { currentUser, isPending: isGetLoading } = useGetMyUserProfile();

  const profileFormMethods = useForm<IFormInput>({
    defaultValues: {
      name: currentUser?.name,
      city: currentUser?.city,
      country: currentUser?.country,
      addressLine1: currentUser?.addressLine1,
    },
  });

  useEffect(() => {
    if (currentUser) {
      profileFormMethods.reset(currentUser);
    }
  }, [currentUser, profileFormMethods]);

  return (
    <div>
      {isGetLoading ? (
        <Loader2 className={`animate-spin mx-auto size-12 text-orange-500`} />
      ) : !currentUser ? (
        <h2 className="text-2xl font-bold text-center">
          Unable to laod user profile
        </h2>
      ) : (
        <FormProvider {...profileFormMethods}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-lg my-1 md:my-2">
            View and change your profile information here
          </p>
          <UserProfileForm
            onSubmit={onSubmit}
            currentUser={currentUser}
            isUpdatingUser={isUpdatingUser}
            buttonText={buttonText}
          />
        </FormProvider>
      )}
    </div>
  );
};
export default Profile;
