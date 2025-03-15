import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import MobileNav from "./components/MobileNav";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import Footer from "./components/Footer";



const App = () => {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const closeMobileNav = () => {
    setShowMobileNav(false)
  }



  return (
    <Auth0ProviderWithNavigate >
      <div className="relative">
        {showMobileNav && <div className="w-full h-screen backdrop-blur-md absolute top-0 z-20"></div>}
        <Header showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
        {showMobileNav && (<MobileNav closeMobileNav={closeMobileNav} />)}
        <main >
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </Auth0ProviderWithNavigate>


  )
}

export default App
