import { Link } from "react-router-dom"
import { paddingX } from './../constants/style.js';
import Dropdown from "./Dropdown.js";
import { useAuth0 } from "@auth0/auth0-react"



const Header = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()


    const loginClick = async () => {
        await loginWithRedirect()
    }

    return (
        <header className="border-b-2 border-orange-500  h-18  absolute bg-white top-0 w-full z-10">
            <nav className={`${paddingX} flex h-full justify-between items-center`}>
                <Link to="/" > <h1 className="text-2xl font-semibold text-orange-600">FD Foody</h1></Link>
                {!isAuthenticated ?
                    <Dropdown />
                    : <button className="text-orange-600 font-semibold p-2 cursor-pointer" onClick={loginClick} >Log In</button>}


            </nav>

        </header>
    )
}

export default Header