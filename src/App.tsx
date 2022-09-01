import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";


const App = () => {

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App
