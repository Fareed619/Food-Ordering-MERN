
import { SubmitHandler, useForm } from 'react-hook-form';
import { paddingX } from '../constants/style';
import { Loader2 } from 'lucide-react';
import { useGetMyUserProfile, useUpdateMyUser } from '../api/MyUserApi';
import { useEffect } from 'react';

interface IFormInput {
    name: string
    city: string
    addressLine1: string
    country: string
}


const Profile = () => {
    const { updateUser, isPending: isUpdateLoading } = useUpdateMyUser()
    const { currentUser, isPending: isGetLoading } = useGetMyUserProfile()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            name: currentUser?.name,
            city: currentUser?.city,
            country: currentUser?.country,
            addressLine1: currentUser?.addressLine1,
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        updateUser(data)
    }

    useEffect(() => {

        reset(currentUser)

    }, [currentUser, reset])



    return (
        <div className={`${paddingX} min-h-screen pt-25 `}>
            {isGetLoading ? <Loader2 className={`animate-spin mx-auto size-12 text-orange-500`} /> : !currentUser ? <h2 className='text-2xl font-bold text-center'>Unable to laod user profile</h2> :
                <>
                    <h1 className='text-4xl font-bold'>User Profile </h1>
                    <p className='text-gray-500 text-lg my-2'>View and change your profile information here</p>

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-16  flex flex-col gap-7'>
                        <label className="">
                            <label htmlFor="email" className='text-lg font-semibold text-black block pb-1'>Email </label>
                            <input className="grow w-full text-lg border p-2 rounded cursor-not-allowed" placeholder={currentUser?.email} disabled />
                        </label>
                        <label className="">
                            <label htmlFor="name" className='text-lg font-semibold text-black block pb-1'>Name </label>
                            <input {...register("name", { required: true, maxLength: 20 })} className="grow w-full text-lg border p-2 rounded " />
                            {errors.name && <span className="text-orange-500">This field is required</span>}
                        </label>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                            <label className="">
                                <label htmlFor="addressLine1" className='text-lg font-semibold text-black block pb-1'>Address Line 1 </label>
                                <input {...register("addressLine1", { required: true, maxLength: 20 })} type='text' className="grow w-full text-lg border p-2 rounded " />
                                {errors.addressLine1 && <span className="text-orange-500">This field is required</span>}
                            </label>
                            <label className="">
                                <label htmlFor="name" className='text-lg font-semibold text-black block pb-1'>City </label>
                                <input {...register("city", { required: true, maxLength: 20 })} type='text' className="grow w-full text-lg border p-2 rounded " />
                                {errors.city && <span className="text-orange-500">This field is required</span>}
                            </label>
                            <label className="">
                                <label htmlFor="name" className='text-lg font-semibold text-black block pb-1'>Country </label>
                                <input {...register("country", { required: true, maxLength: 20 })} type='text' className="grow w-full text-lg border p-2 rounded" />
                                {errors.country && <span className="text-orange-500">This field is required</span>}
                            </label>
                        </div>
                        <button type="submit" className='w-fit bg-orange-500 text-white p-2 px-6 rounded-lg shadow cursor-pointer '>{isUpdateLoading ? <Loader2 className='animate-spin' /> : 'Submit'}</button>
                    </form>
                </>
            }

        </div>
    )
}
export default Profile
