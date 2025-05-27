import landing_img from "../assets/landing.png";
import app_download from "../assets/appDownload.png"
import { paddingX } from '../constants/style';

const LandingHome = () => {
  return (
    <div className={`${paddingX} w-full flex flex-col sm:flex-row gap-3 justify-between items-center my-2`}>
      <div className="flex-1">
        <img src={landing_img} alt="" />
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-2xl font-medium">Order Take-away even faster!</h1>
        <p className="py-3">Download the Mern app for faster ordering and personalsted</p>
        <img src={app_download} alt="app-download" className="w-fit mx-auto" />
      </div>

    </div>
  )
}

export default LandingHome
