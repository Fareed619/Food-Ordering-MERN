import hero_img from "../assets/hero.png";
import LandingHome from "../components/LandingHome";
import SearchCardHome from "../components/SearchCardHome";
import { scale } from "../utils/loadFunction.js";
import useLoadImg from "../utils/useLoadImg.js";
const Home = () => {
  const { load } = useLoadImg();

  return (
    <div className="min-h-screen">
      <div className="relative">
        <img
          src={hero_img}
          alt="hero-img"
          className={`h-[50vh] md:h-[70vh] lg:h-[90vh] w-full -z-10 object-cover`}
          style={{ filter: `blur(${scale(load, 0, 100, 30, 0)}px)` }}
        />

        <div
          className={`absolute top-[50%] left-[50%] translate-1/2 text-white text-xl z-10 `}
          style={{ opacity: scale(load, 0, 100, 1, 0) }}
        >
          {load}%
        </div>
      </div>
      <div className="h-full md:h-[8rem]">
        {" "}
        <SearchCardHome />{" "}
      </div>
      <LandingHome />
    </div>
  );
};

export default Home;
