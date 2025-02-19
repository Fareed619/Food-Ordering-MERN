import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div >
      <button className="btn btn-primary">Hello</button>

      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default App
