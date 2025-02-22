import { paddingX } from './../constants/style';
import { Search } from "lucide-react"

const SearchCardHome = () => {
    return (
        <div className={`${paddingX}  bg-white p-4 rounded shadow-xl   -translate-y-15 md:-translate-y-27 lg:-translate-y-40`}>
            <div className='w-full p-2'>
                <h2 className='text-center text-2xl md:text-4xl font-bold text-orange-600 '>Tuch into a takeaway today</h2>
                <p className='text-center text-base md:text-lg py-1'>Food is just a click way</p>

                <div className='md:w-[80%] mx-auto p-3 relative'>
                    <Search className='absolute bottom-6 left-5 text-orange-500' />
                    <input type="text" placeholder='Search by city or town' className='w-full p-3 rounded-full pl-10 border-gray-400 outline-none' />
                    <div className='flex gap-1 absolute right-6 bottom-5'>
                        <button className='py-1.5 px-4 cursor-pointer  rounded-full text-sm border border-gray-500 '>Reset</button>
                        <button className='py-1.5 px-4 cursor-pointer bg-orange-500 text-white rounded-full text-sm'>Search</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchCardHome
