import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


type CreateUserRequest = {
    auth0Id: string,
    email: string
}

type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

type User = {
    _id: string;
    email: string;
    name: string;
    city: string;
    country: string;
    addressLine1: string;
}


export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
        console.log(response.json())
    }

    const { mutate: createUser, isLoading, isError, isSuccess } = useMutation({ mutationFn: createMyUserRequest })

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }

}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUserRequest = async (form: UpdateMyUserRequest) => {

        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            throw new Error("Failed to update user")
        }
        return response.json()
    }

    const { mutateAsync: updateUser, isSuccess, isPending, error, reset } = useMutation({ mutationFn: updateMyUserRequest })


    if (isSuccess) {
        toast.success("User Profile Updated!")
    }
    if (error) {
        toast.error(error.message)
        reset()
    }

    return {
        updateUser,
        isPending,
    }
}

export const useGetMyUserProfile = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getUserProfileRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch user")
        }
        return response.json()
    }

    const { data: currentUser, isPending, error } = useQuery({ queryKey: ["fetchCurrentUser"], queryFn: getUserProfileRequest })

    if (error) {
        toast.error(error.message)
    }
    return {
        currentUser,
        isPending
    }

}







