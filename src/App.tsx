import { Route, Routes } from "react-router-dom"
import Login from "./components/registrations/Login"
import Register from "./components/registrations/Register"
import Home from "./components/templates/Home"


function App() {

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      {/* <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Home />} />
      </Routes> */}
      <h1>Con cac</h1>
    </div>
  )
}

export default App
