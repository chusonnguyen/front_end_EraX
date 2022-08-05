import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';

import { NavLink } from 'react-router-dom'


const Navbar = () => {

  const nav_top = [
    {id: 1, icon: <GridViewOutlinedIcon className='w-36 h-36'/>, ref: '*'},
    {id: 2, icon: <ManageSearchOutlinedIcon/>, ref: 'history'},
    {id: 3, icon: <FolderOutlinedIcon/>, ref: 'projects'},
  ]

  const nav_bottom = [
    {id: 1, icon: <PersonIcon/>, ref: 'profile'},
    {id: 2, icon: <SettingsOutlinedIcon/>, ref: 'settings'},
    {id: 3, icon: <LogoutOutlinedIcon/>, ref: 'logout', rev: true},
  ]

  return (
    <div className='w-full h-full flex flex-col justify-between items-center py-6 gap-16 pt-10'>
      <span className='text-intel-blue text-xl font-medium'>Intel</span>
      <div className='w-full h-full flex flex-col justify-between items-center'>
          <div className='flex flex-col justify-center items-center gap-2'>
            {nav_top.map((ele, index) => {
              return (
                <NavLink className={`text-icon-gray p-3 rounded-lg hover:bg-intel-blue hover:text-white`} key={index} to={ele.ref}>
                  {ele.icon}
                </NavLink>
              )
            })}
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            {nav_bottom.map((ele, index) => {
              return (
                <NavLink className={`text-icon-gray p-3 rounded-lg hover:bg-intel-blue hover:text-white ${ele.rev ? "rotate-180" : ""}`} key={index} to={ele.ref}>
                  {ele.icon}
                </NavLink>
              )
            })}
          </div>
          
      </div>
      
    </div>
  )
}

export default Navbar