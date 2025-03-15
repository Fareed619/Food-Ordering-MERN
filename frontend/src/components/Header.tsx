import { Link } from "react-router-dom"
import { paddingX } from './../constants/style.js';
import Dropdown from "./Dropdown.js";
import { useAuth0 } from "@auth0/auth0-react"
import { List } from "lucide-react";

type Props = {
    showMobileNav: boolean,
    setShowMobileNav: () => void
}


const Header = ({ showMobileNav, setShowMobileNav }: Props) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0()



    const loginClick = async () => {
        await loginWithRedirect()
    }

    return (
        <header className="border-b-2 border-orange-500  h-18 absolute bg-white top-0 w-full z-10">
            <nav className={`${paddingX} flex h-full justify-between items-center`}>
                <Link to="/" > <h1 className="text-3xl font-semibold text-orange-600">FD Foody</h1></Link>
                <div className="hidden md:block">
                    {isAuthenticated ?
                        <Dropdown />
                        : <button className=" text-orange-600 font-semibold p-2 cursor-pointer" onClick={loginClick} >Log In</button>
                    }
                </div>

                {!showMobileNav && <button className={`block md:hidden`} onClick={() => setShowMobileNav(!showMobileNav)}> <List className="text-orange-500 cursor-pointer" /></button>}


            </nav>

        </header>
    )
}

export default Header