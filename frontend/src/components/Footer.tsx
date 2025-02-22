
import { Link } from 'react-router-dom';
import { paddingX } from './../constants/style';
const Footer = () => {
    return (
        <footer className="w-full bg-orange-500 h-[13rem] mt-6">
            <div className={`${paddingX} h-full flex flex-col sm:flex-row items-center justify-center gap-5 sm:justify-between text-white `}>
                <Link to="/" > <h1 className="text-2xl font-semibold ">FD Foody</h1></Link>
                <ul className='flex gap-4 items-center'>
                    <li>Privacy Policy</li>
                    <li>Terms of Services</li>
                </ul>


            </div>

        </footer>
    )
}

export default Footer
