
import hero_img from "../assets/hero.png"
import Footer from "../components/Footer"
import LandingHome from "../components/LandingHome"
import SearchCardHome from "../components/SearchCardHome"
const Home = () => {
    return (
        <div >
            <div> <img src={hero_img} alt="" className="max-h-[90vh] w-full" /> </div>
            <div className="h-full md:h-[8rem]"> <SearchCardHome /> </div>
            <LandingHome />
            <Footer />

        </div>
    )
}

export default Home
