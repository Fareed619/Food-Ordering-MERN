import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};

const userFormSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    console.log(response.json());
  };

  const {
    mutate: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createMyUserRequest });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (form: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  };

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: updateMyUserRequest,
    onSuccess: () => {
      toast.success("User Profile Updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    updateUser,
    isPending,
  };
};

export const useGetMyUserProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserProfileRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isPending,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getUserProfileRequest,
  });

  if (error) {
    toast.error(error.message);
  }
  return {
    currentUser,
    isPending,
  };
};
