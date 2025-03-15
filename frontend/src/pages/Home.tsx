
import { useEffect, useState } from "react"
import hero_img from "../assets/hero.png"
import Footer from "../components/Footer"
import LandingHome from "../components/LandingHome"
import SearchCardHome from "../components/SearchCardHome"
import { scale } from './../utils/loadFunction.js';
const Home = () => {
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (load >= 100) return;

        const interval = setInterval(() => {
            setLoad((prevLoad) => prevLoad + 1);
        }, 30);

        return () => clearInterval(interval);
    }, [load]);



    return (
        <div className="min-h-screen">
            <div className="relative">
                <img src={hero_img} alt="hero-img" className={`h-[40vh] sm:h-full  sm:max-h-[90vh] w-full -z-10 `} style={{ filter: `blur(${scale(load, 0, 100, 30, 0)}px)` }}

                />
                <div className={`absolute top-[50%] left-[50%] translate-1/2 text-white text-xl z-10 `} style={{ opacity: scale(load, 0, 100, 1, 0) }}>{load}%</div>
            </div>
            <div className="h-full md:h-[8rem]"> <SearchCardHome /> </div>
            <LandingHome />
           

        </div>
    )
}

export default Home
