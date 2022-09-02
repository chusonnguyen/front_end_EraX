import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { NavLink , useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import FolderIcon from '@mui/icons-material/Folder';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import axios from 'axios'

interface History {
  id: number,
  project_id: number,
  project_name: string,
  description: string,
  user_id: string,
  username: string,
  Time: string
}

interface Project {
  project_id: number,
  user_id: string,
  project_name: string,
  project_type: string,
  address: string,
  last_modified: string,
  created_by: string
}

interface Zone {
  zone_id:       number,
  project_id:    number,
  zone_name:     string,
  zone_type:     string,
  width:         number,
  length:        number,
  totalPoll:     number,
  pollRow:       number,
  pollX:         number,
  pollY:         number,
  pollW:         number,
  pollL:         number,
  pollGap:       number,
  pollRowGap:    number,
  user_id:       string,
  last_modified: string,
  created_by:    string,
}


const Zones = () => {
  let navigate = useNavigate()
  let {id} = useParams()
  const [viewLog, setViewLog] = useState(false)
  const [zoneData, setZoneData] = useState<Zone[]>([])
  const [projectData, setProjectData] = useState<Project[]>([])
  const token = localStorage.getItem("token")
  const [history, setHistory] = useState<History[]>([])

  const fetchToken = async () => {
    if(!token) {
      navigate('/login')
    }
    await axios.get(`https://intel-backend.herokuapp.com/verify-token`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then(
      (response) => {
        console.log(response.status)
        if(response.status == 200) {
          
        }
        if(response.status == 401) {
          localStorage.clear()
          navigate('/login')
          
        }
      },
      (error) => {
        console.log(error)
        navigate('/login')
        localStorage.clear()
      }
    )
  }

  const fetchHistory = async () => {
    await axios.get(`https://intel-backend.herokuapp.com/project/history/${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
  })
      .then(res => {
        if(res.status == 200) {
          const history = res.data
          setHistory(history)
        }
        if(res.status == 401) {
          localStorage.clear()
          navigate('/login')
        }
        
      })
  }

  const fetchZones = async () => {
    await axios.get(`https://intel-backend.herokuapp.com/zones/project=${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then((res: any) => {
      console.log(res.status)
      if(res.status == 200) {
        const zone = res.data
        setZoneData(zone)
      }
      if(res.status == 401) {
        localStorage.clear()
        navigate('/login')
      }
      
    },
      (error) => {
        console.log(error)
      }
    )
  }

  const fetchProjects = async () => {
    await axios.get(`https://intel-backend.herokuapp.com/project/${id}`, {
      headers: {
        'x-access-token': `${token}`
      }
    })
    .then((res: any) => {
      if(res.status == 200) {
        const project = res.data
        setProjectData(project)
      }
      if(res.status == 401) {
        navigate('/login')
        localStorage.clear()
      }
      
    })
  }

  useEffect(() => {
    fetchProjects()
    fetchZones()
    fetchToken()
    fetchHistory()
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-start items-start px-6 overflow-y-auto'>
      <div className='w-full flex justify-between items-center py-6 md:flex-row flex-col'>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <NavLink to={'/*'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <NavLink to={'/projects'} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Projects</NavLink>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">Zones</span>
              </div>
            </li>
          </ol>
        </nav>
        <NavLink to={`/project/${id}/create-zone`} type="button" className="md:mt-0 mt-6 px-6 py-3 rounded-lg bg-intel-blue hover:bg-blue-900 text-white">+ Create Zone</NavLink>
      </div>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className='flex flex-col justify-start items-center gap-10 col-span-2 lg:col-span-1'>
          <div className="w-full bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <div className="w-full h-44 overflow-hidden bg-[url('../src/assets/images/intel-project.jpg')] bg-no-repeat bg-cover">
            </div>
            {projectData.map(project => {
              return (
                <div className='w-full flex flex-col p-3 gap-4 justify-center items-center'>
                <div className="flex w-full flex-col gap-3 p-5 ">
                  <div className='w-full flex flex-col justify-start items-start pb-4 '>
                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate w-full">{project.project_name}</span>
                    <div className='flex justify-center gap-3 items-center pt-2'>
                      <WarehouseIcon className='text-gray-400'/>
                      <span className='text-gray-400 font-semibold uppercase'>Warehouse</span>
                    </div>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-start items-start'>
                      <span className='font-medium'>{project.project_id}</span>
                      <span className='text-base text-gray-400 font-semibold'>ID</span>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                      <span className='font-medium'>3 out of 3</span>
                      <span className='text-base text-gray-400 font-semibold'>Zones</span>
                    </div>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-start items-start'>
                      <span className='font-medium'>4</span>
                      <span className='text-base text-gray-400 font-semibold'>Users</span>
                    </div>
                    <div className="flex -space-x-4">
                        <span className='w-8 h-8 rounded-md bg-yellow-100 text-sm flex justify-center items-center'>DH</span>
                        <span className='w-8 h-8 rounded-md bg-blue-100 text-sm flex justify-center items-center'>DH</span>
                        <span className='w-8 h-8 rounded-md bg-red-100 text-sm flex justify-center items-center'>DH</span>
                        <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-lg hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                    </div>
                  </div>
                  <div className='w-full flex justify-between mt-2 items-center'>
                    <p className="text-base font-normal text-gray-700 dark:text-gray-400">Created by <span className='font-bold'>{project.created_by}</span></p>
                  </div>
                </div>
                <div className='bg-blue-100 rounded p-4 w-full'>
                  <div className='flex justify-between items-center w-full text-intel-blue'>
                    <div className='w-3/4 cursor-pointer truncate'>
                      <span className='hover:underline'>{project.address}</span>
                    </div>
                    <NavLink to={''}>
                      <LocationOnIcon/>
                    </NavLink>
                  </div>
                </div>
              </div>
              )
            })}

          </div>
          <div className='w-full bg-white border rounded-lg p-6 flex flex-col gap-8'>
            <span className='font-bold text-2xl'>About Project</span>
          </div>
        </div>
        <div className='col-span-2 lg:col-span-3 flex flex-col gap-10 justify-start items-center'>
          <div className='flex flex-col gap-6 w-full justify-center items-center'>
            <div className='flex justify-between w-full items-center'>
              <span className="text-2xl font-bold">Zones</span>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {zoneData.map((zone, zoneid) => {
                return (
                  <NavLink key={zoneid} to={`/project/${id}/zone/${zone.zone_id}`} state={{projectID: id}}  className="bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
                  <div className="flex w-full flex-col gap-1 p-5">
                    <span className='text-gray-600 font-semibold uppercase'>{zone.zone_type}</span>
                    <div className='w-full flex justify-between items-center'>
                      <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{zone.zone_name}</span>
                      <span>ID: {zone.zone_id}</span>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>Last modified</span>
                      <div className="flex -space-x-4">
                          <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="../src/assets/images/avatar.png" alt=""/>
                          <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="../src/assets/images/avatar.png" alt=""/>
                          <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src="../src/assets/images/avatar.png" alt=""/>
                          <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                      </div>
                    </div>
                    <div className='w-full flex justify-between mt-2 items-center'>
                      <p className="text-base font-normal text-gray-700 dark:text-gray-400">Created by <span className='font-bold'>{zone.created_by}</span></p>
                      <NavLink to={`/project/${id}/edit-zone/${zone.zone_id}`} state={`${id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Edit
                          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </NavLink>
                    </div>
                  </div>
                </NavLink>
                )
              })}

            </div>
          </div>
          {/* ACTIVITY */}
          <div className='flex flex-col gap-6 w-full justify-center items-center'>
            <div className='flex justify-start items-center gap-6 w-full'>
              <span className="text-2xl font-bold">Activity</span>
              <div className='flex justify-between items-center gap-6'>
                <span className="text-lg uppercase">All</span>
              </div>
            </div>
            {
              
            }
            <div className='w-full flex flex-col gap-2 justify-center items-center pb-6'>
              {history.map((h) => {
                return (
                  <div className='px-4 md:px-6 py-2 md:py-4 border w-full bg-white hover:shadow-md'>
                    <div className='w-full flex justify-between'>
                      <div className='w-3/4 flex justify-start items-center gap-6'>
                        <div className='hidden md:block'>
                          <AutoAwesomeMosaicIcon className='text-gray-500'/>
                        </div>
                        <span className='p-1 rounded-md bg-yellow-100 text-sm  justify-center items-center hidden md:flex'>DH</span>
                        <div className='flex flex-col justify-start items-start gap-1'>
                          <span className='text-base md:text-lg'><span className='font-bold'>{h.username}</span> update <span className='font-bold'>{h.project_name}</span></span>
                          <div className='flex justify-start md:justify-center items-center gap-2 text-xs'>
                            <span className='hidden md:block'>{h.project_name}</span>
                            <span className='text-gray-400 md:block hidden'>54d45s</span>
                            <span className='text-gray-400 truncate w-2/3 md:w-full'>{h.description}</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-6 justify-center items-center'>
                        <span className='text-xs text-gray-400'>{h.Time}</span>
                        <div className='relative'>
                          <div onClick={() => setViewLog(!viewLog)} className='flex justify-center items-center p-2 hover:bg-gray-50 cursor-pointer'>
                            <MoreVertIcon className='text-gray-500'/>
                          </div>
                          <NavLink to={''} className={`${!viewLog ? "hidden" : "block"} absolute bg-white p-2 flex justify-start items-start w-48 shadow-lg right-0`}>
                            <span className='w-full px-4 py-2 hover:bg-gray-100'>View log</span>
                          </NavLink>
                        </div>   
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Zones