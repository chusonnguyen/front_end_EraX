import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import UserProfile from "./components/profile/UserProfile";
import CreateProject from "./components/projects/CreateProject";
import EditProject from "./components/projects/EditProject";
import Projects from "./components/projects/Projects";
import Login from "./components/registrations/Login"
import Register from "./components/registrations/Register"
import Home from "./components/templates/Home"
import CreateZone from "./components/zones/CreateZone";
import EditZone from "./components/zones/EditZone";
import Zones from "./components/zones/Zones";


const AppRouter = () => {
    const location = useLocation();
    return (
        <Routes key={location.pathname} location={location}>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            {/* <Route path='history' element={<History />} /> */}
            <Route path='projects' element={<Projects />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='projects/create-project' element={<CreateProject />} />
            <Route path='project/edit/:id' element={<EditProject />} />
            <Route path='project/:id' element={<Zones />} />
            <Route path='project/:id/create-zone' element={<CreateZone />} />
            <Route path='project/:id/edit-zone/:id' element={<EditZone />} />
            <Route path='project/:id/zone/:id' element={<Layout />} />
            <Route path='*' element={<div>Not found page</div>} />
        </Routes>
    )
}

export default AppRouter;