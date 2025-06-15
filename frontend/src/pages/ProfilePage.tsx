import { SubmitHandler } from "react-hook-form";
import { useUpdateMyUser } from "../api/MyUserApi";
import { standartPage } from "../constants/style";
import Profile, { IFormInput } from "./Profile";

const ProfilePage = () => {
  const { updateUser, isPending: isUpdatingUser } = useUpdateMyUser();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateUser(data);
  };

  return (
    <div className={`${standartPage}`}>
      <Profile onSubmit={onSubmit} isUpdatingUser={isUpdatingUser} />
    </div>
  );
};

export default ProfilePage;
