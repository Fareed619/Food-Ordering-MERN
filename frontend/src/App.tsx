import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';



const App = () => {


  return (
    <div >
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />


    </div>
  )
}

export default App
