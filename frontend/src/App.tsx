import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import MobileNav from "./components/MobileNav";



const App = () => {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const closeMobileNav = () => {
    setShowMobileNav(false)
  }



  return (
    <div className="relative">
      {showMobileNav && <div className="w-full h-screen backdrop-blur-md absolute top-0 z-20"></div>}
      <Header showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
      {showMobileNav && (<MobileNav closeMobileNav={closeMobileNav} />)}
      <main >
        <Outlet />
      </main>
      <Toaster />


    </div>
  )
}

export default App
