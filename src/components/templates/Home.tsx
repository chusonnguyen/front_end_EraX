import { Route, Routes } from "react-router-dom"
import Header from "../header/Header"
import Layout from "../layout/Layout"
import Navbar from "../navigation/Navbar"
import CreateProject from "../projects/CreateProject"
import Projects from "../projects/Projects"
import CreateZone from "../zones/CreateZone"
import Zones from "../zones/Zones"
import Dashboard from "../dashboard/Dashboard"
import History from "./History"
import UserProfile from "../profile/UserProfile"
import EditProject from "../projects/EditProject"
import EditZone from "../zones/EditZone"

const Home = () => {
  return (
    <div className="w-full h-full overflow-hidden flex justify-center items-center divide-x">
      <div className="basis-20 h-full hidden justify-center items-center bg-white md:flex">
        <Navbar />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center divide-y">
        <Header />
        <div className="w-full h-full flex justify-center items-center bg-white overflow-y-hidden">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='history' element={<History />} />
            <Route path='projects' element={<Projects />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='projects/create-project' element={<CreateProject />} />
            <Route path='project/edit/:id' element={<EditProject />} />
            <Route path='project/:id' element={<Zones />} />
            <Route path='project/:id/create-zone' element={<CreateZone />} />
            <Route path='project/:id/edit-zone/:id' element={<EditZone />} />
            <Route path='project/:id/zone/:id' element={<Layout />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default Home