import { useAuth0 } from "@auth0/auth0-react"
import { CircleUserRound } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"




const Dropdown = () => {
    const [showDropdown, setShowDropDown] = useState(false)
    const { user, logout } = useAuth0()

    const logoutHandler = () => {
        logout()
        toast.success("Logged Out Successfully")
    }

    return (
        <div className="relative">
            <button className="cursor-pointer text-orange-500 " onClick={() => setShowDropDown(!showDropdown)} >
                {user?.picture ?
                    <img src={user?.picture} alt="picture" className="size-9 rounded-full inline-flex" /> : <CircleUserRound className="inline-block" size={25} />}
                <span className="ml-1  text-lg font-medium"> {user?.name}</span>
            </button>
            {showDropdown && (<ul className={` w-52 rounded-box bg-base-100 shadow-sm absolute top-12 right-0 p-2 transition-all 
            opacity-95 transition-discrete starting:opacity-0 duration-500`}
            >
                <li className="font-medium hover:text-orange-500 hover:bg-gray-100 rounded p-1 transition-all duration-400 "><Link to="/user-profile">User Profile</Link></li>
                <li className="font-medium cursor-pointer bg-orange-500 text-white rounded-lg mt-1 p-1 hover:bg-orange-600"><button onClick={logoutHandler}>Log Out</button></li>
            </ul>)}

        </div>
    )
}

export default Dropdown
