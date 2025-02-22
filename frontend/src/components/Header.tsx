import { Link } from "react-router-dom"
import { paddingX } from './../constants/style.js';

type Props = {

}

const Header = ({ }: Props) => {
    return (
        <div className="border-b-2 border-orange-500  h-20 pt-5 absolute bg-white top-0 w-full">
            <nav className={`${paddingX} flex justify-between`}>
                <Link to="/" > <h1 className="text-2xl font-semibold text-orange-600">FD Foody</h1></Link>
                <button className="text-orange-600 font-semibold p-2 cursor-pointer">Login</button>
            </nav>

        </div>
    )
}

export default Header